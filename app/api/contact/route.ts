import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

// GET /api/contact - Fetch contact messages with pagination, search, and sorting (Admin only)
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
            { email: { contains: search, mode: "insensitive" as const } },
            { phoneNumber: { contains: search, mode: "insensitive" as const } },
            { message: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    // Get total count
    const totalCount = await prisma.contact.count({
      where: whereCondition,
    });

    // Get paginated messages
    const contacts = await prisma.contact.findMany({
      where: whereCondition,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: offset,
      take: limit,
    });

    return NextResponse.json({
      data: contacts,
      meta: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Contact fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch contact inquiries" },
      { status: 500 }
    );
  }
}

// POST /api/contact - Create a new contact message (Public)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email || null,
        phoneNumber: data.phoneNumber,
        message: data.message,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Contact creation error:", error);
    return NextResponse.json(
      { message: "Failed to submit message" },
      { status: 500 }
    );
  }
}
