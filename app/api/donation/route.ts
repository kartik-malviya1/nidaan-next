import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const donationSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  amount: z.number().positive("Amount must be a positive number"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\+?[0-9\s\-]+$/, "Invalid phone number format")
    .trim(),
  panCard: z
    .string()
    .length(10, "PAN card must be exactly 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, "Invalid PAN Card format")
    .toUpperCase()
    .trim(),
  transactionId: z.string().min(1, "Transaction ID / UTR is required").trim(),
});

// GET /api/donation - Fetch donations with pagination, search, and sorting
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

    const offset = (page - 1) * limit;

    // Define search conditions
    const whereCondition = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { phoneNumber: { contains: search, mode: "insensitive" as const } },
            { panCard: { contains: search, mode: "insensitive" as const } },
            { transactionId: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    // Get total count
    const totalCount = await prisma.donation.count({
      where: whereCondition,
    });

    // Get paginated donations
    const donations = await prisma.donation.findMany({
      where: whereCondition,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: offset,
      take: limit,
    });

    // Convert decimal to standard number in JS to avoid parsing issues in frontend
    const serializedDonations = donations.map((donation) => ({
      ...donation,
      amount: Number(donation.amount),
    }));

    return NextResponse.json({
      data: serializedDonations,
      meta: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Donation fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}

// POST /api/donation - Create a new donation record (Public)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = donationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check unique transaction ID
    const existingTx = await prisma.donation.findUnique({
      where: { transactionId: data.transactionId },
    });

    if (existingTx) {
      return NextResponse.json(
        { message: "Duplicate transaction", errors: { transactionId: ["This Transaction ID / UTR has already been submitted."] } },
        { status: 409 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        name: data.name,
        amount: data.amount,
        phoneNumber: data.phoneNumber,
        panCard: data.panCard,
        transactionId: data.transactionId,
      },
    });

    return NextResponse.json(
      {
        ...donation,
        amount: Number(donation.amount),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Donation creation error:", error);
    return NextResponse.json(
      { message: "Failed to process donation" },
      { status: 500 }
    );
  }
}
