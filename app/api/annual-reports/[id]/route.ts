import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Optional token verification for dashboard operations
    const authHeader = req.headers.get("authorization");
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      const cookieHeader = req.headers.get("cookie");
      if (cookieHeader) {
        const cookies = Object.fromEntries(
          cookieHeader.split(";").map((c) => c.trim().split("="))
        );
        token = cookies["admin-token"] || "";
      }
    }

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Annual Report ID is required" },
        { status: 400 }
      );
    }

    // Check if report exists
    const report = await prisma.annualReport.findUnique({
      where: { id },
    });

    if (!report) {
      return NextResponse.json(
        { message: "Annual Report not found" },
        { status: 404 }
      );
    }

    // Delete record from database
    await prisma.annualReport.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Annual Report successfully deleted",
      id,
    });
  } catch (error) {
    console.error("Annual report deletion error:", error);
    return NextResponse.json(
      { message: "Failed to delete annual report" },
      { status: 500 }
    );
  }
}
