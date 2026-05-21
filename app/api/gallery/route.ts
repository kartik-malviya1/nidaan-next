import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/gallery - Fetch all gallery images with optional filters
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";

    const where: any = {};

    if (category && category !== "all" && category !== "All") {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }

    const images = await prisma.gallery.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

// POST /api/gallery - Save uploaded image details
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.url) {
      return NextResponse.json(
        { message: "Image URL is required" },
        { status: 400 }
      );
    }

    const gallery = await prisma.gallery.create({
      data: {
        title: body.title || "Untitled",
        category: body.category || "General",
        url: body.url,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Gallery create error:", error);
    return NextResponse.json(
      { message: "Failed to save image" },
      { status: 500 }
    );
  }
}