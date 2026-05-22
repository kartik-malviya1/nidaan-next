import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE /api/application/[id] - Delete an application
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.application.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }
    console.error("Application delete error:", error);
    return NextResponse.json(
      { message: "Failed to delete application" },
      { status: 500 }
    );
  }
}

// PATCH /api/application/[id] - Update application status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const validStatuses = ["pending", "reviewed", "accepted", "rejected"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status. Must be one of: " + validStatuses.join(", ") },
        { status: 400 }
      );
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(application);
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }
    console.error("Application update error:", error);
    return NextResponse.json(
      { message: "Failed to update application" },
      { status: 500 }
    );
  }
}
