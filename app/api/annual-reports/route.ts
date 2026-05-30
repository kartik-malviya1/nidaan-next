import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET /api/annual-reports - Fetch all annual reports
export async function GET(req: Request) {
  try {
    const reports = await prisma.annualReport.findMany({
      orderBy: [
        { featured: "desc" },
        { year: "desc" },
      ],
    });

    // Parse highlights JSON safely
    const formattedReports = reports.map((report) => ({
      ...report,
      highlights: Array.isArray(report.highlights) 
        ? report.highlights 
        : typeof report.highlights === "string" 
          ? JSON.parse(report.highlights) 
          : [],
    }));

    return NextResponse.json(formattedReports);
  } catch (error) {
    console.error("Annual reports fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch annual reports" },
      { status: 500 }
    );
  }
}

// POST /api/annual-reports - Create a new annual report
export async function POST(req: Request) {
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

    const body = await req.json();
    const { year, title, highlights, coverUrl, pdfUrl, featured } = body;

    // Validate required fields
    if (!year || !title || !coverUrl || !pdfUrl) {
      return NextResponse.json(
        { message: "Year, title, cover image, and PDF document are all required." },
        { status: 400 }
      );
    }

    // Check for duplicate year
    const existingReport = await prisma.annualReport.findUnique({
      where: { year },
    });

    if (existingReport) {
      return NextResponse.json(
        { message: `An annual report for the year "${year}" already exists.` },
        { status: 409 }
      );
    }

    // If featured is true, set all other reports to featured: false first
    if (featured === true) {
      await prisma.annualReport.updateMany({
        where: { featured: true },
        data: { featured: false },
      });
    }

    const highlightsArray = Array.isArray(highlights) ? highlights : [];

    const newReport = await prisma.annualReport.create({
      data: {
        year,
        title,
        highlights: highlightsArray,
        coverUrl,
        pdfUrl,
        featured: !!featured,
      },
    });

    return NextResponse.json(newReport);
  } catch (error) {
    console.error("Annual report create error:", error);
    return NextResponse.json(
      { message: "Failed to create annual report" },
      { status: 500 }
    );
  }
}
