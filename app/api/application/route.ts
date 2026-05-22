import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validations";

// GET /api/application - Fetch applications with pagination, search, sorting, and type filter (Admin)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
    const type = searchParams.get("type") || ""; // "Volunteer" or "Internship"
    const status = searchParams.get("status") || ""; // "pending", "reviewed", "accepted", "rejected"

    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions: any[] = [];

    if (type) {
      conditions.push({ type: { equals: type } });
    }

    if (status) {
      conditions.push({ status: { equals: status } });
    }

    if (search) {
      conditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search, mode: "insensitive" as const } },
          { city: { contains: search, mode: "insensitive" as const } },
          { institution: { contains: search, mode: "insensitive" as const } },
          { area: { contains: search, mode: "insensitive" as const } },
        ],
      });
    }

    const whereCondition = conditions.length > 0 ? { AND: conditions } : {};

    // Get total count
    const totalCount = await prisma.application.count({
      where: whereCondition,
    });

    // Get paginated applications
    const applications = await prisma.application.findMany({
      where: whereCondition,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: offset,
      take: limit,
    });

    return NextResponse.json({
      data: applications,
      meta: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Application fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST /api/application - Submit a new volunteer/internship application (Public)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = applicationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    const application = await prisma.application.create({
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        institution: data.institution,
        area: data.area,
        duration: data.duration || null,
        availability: data.availability || null,
        motivation: data.motivation,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Application creation error:", error);
    return NextResponse.json(
      { message: "Failed to submit application" },
      { status: 500 }
    );
  }
}
