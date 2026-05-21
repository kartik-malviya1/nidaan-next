import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Run counting and sum queries in parallel for high efficiency
    const [
      totalGalleryCount,
      totalDonationCount,
      donationSumAggregate,
      totalContactCount,
      recentUploads,
      recentDonations,
      recentContacts,
    ] = await Promise.all([
      // 1. Total gallery images count
      prisma.gallery.count(),

      // 2. Total donations count
      prisma.donation.count(),

      // 3. Total donation amount sum
      prisma.donation.aggregate({
        _sum: {
          amount: true,
        },
      }),

      // 4. Total contact messages count
      prisma.contact.count(),

      // 5. Recent uploads (last 5)
      prisma.gallery.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      // 6. Recent donations (last 5)
      prisma.donation.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),

      // 7. Recent contacts (last 5)
      prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    const totalDonationAmount = Number(donationSumAggregate._sum.amount || 0);

    // Convert decimal values to standard JS numbers in recent donations
    const serializedRecentDonations = recentDonations.map((donation) => ({
      ...donation,
      amount: Number(donation.amount),
    }));

    return NextResponse.json({
      stats: {
        totalGalleryImages: totalGalleryCount,
        totalDonations: totalDonationCount,
        totalDonationAmount,
        totalContacts: totalContactCount,
      },
      recentUploads,
      recentDonations: serializedRecentDonations,
      recentContacts,
    });
  } catch (error) {
    console.error("Dashboard stats query error:", error);
    return NextResponse.json(
      { message: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}
