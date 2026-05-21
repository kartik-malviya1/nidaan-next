import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Image ID is required" },
        { status: 400 }
      );
    }

    // Check if image exists
    const image = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json(
        { message: "Image not found" },
        { status: 404 }
      );
    }

    // Delete record from database
    await prisma.gallery.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Image successfully deleted",
      id,
    });
  } catch (error) {
    console.error("Gallery deletion error:", error);
    return NextResponse.json(
      { message: "Failed to delete image" },
      { status: 500 }
    );
  }
}
