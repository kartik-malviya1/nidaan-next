import type { Metadata } from "next";
import { Manrope, Dancing_Script } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-tagline",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nidaan.org"), // Replace with actual domain

  title: {
    default:
      "NIDAAN Child Care, Therapy Centre & Inclusive School | Special Education & Rehabilitation",
    template: "%s | NIDAAN",
  },

  description:
    "NIDAAN Child Care, Therapy Centre, Inclusive School and NIDAAN Institute of Rehabilitation and Training (NIRT) provide therapy, special education, rehabilitation, early intervention, and inclusive care for children with autism, ADHD, learning disabilities, cerebral palsy, and developmental delays.",

  keywords: [
    "NIDAAN",
    "NIRT",
    "Nidaan Sewa Samiti",
    "special education",
    "autism therapy",
    "ADHD support",
    "speech therapy",
    "occupational therapy",
    "physiotherapy",
    "ABA therapy",
    "inclusive school",
    "early intervention",
    "cerebral palsy rehabilitation",
    "learning disabilities",
    "developmental delays",
    "child therapy centre",
    "special needs children",
    "mental health awareness",
    "NIOS support",
    "vocational training",
    "Bhopal therapy centre",
    "Indore therapy centre",
    "rehabilitation centre India",
  ],

  authors: [
    {
      name: "NIDAAN Sewa Samiti",
      url: "https://www.nidaan.org",
    },
  ],

  creator: "NIDAAN Sewa Samiti",
  publisher: "NIDAAN Sewa Samiti",

  applicationName: "NIDAAN",

  category: "Nonprofit Organization",

  classification:
    "Child Care, Therapy Centre, Inclusive School, Rehabilitation and Training Institute",

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: "https://www.nidaan.org",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.nidaan.org",
    siteName: "NIDAAN",
    title:
      "NIDAAN Child Care, Therapy Centre & Inclusive School | Where Every Potential Unfolds",
    description:
      "Empowering children with diverse abilities through therapy, education, rehabilitation, and inclusive care in Bhopal and Indore.",
    images: [
      {
        url: "/logo.jpg", // Create a 1200x630 image
        width: 1200,
        height: 630,
        alt: "NIDAAN Child Care, Therapy Centre and Inclusive School",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "NIDAAN Child Care, Therapy Centre & Inclusive School",
    description:
      "Special education, therapy, rehabilitation, and inclusive care for children with diverse abilities.",
    images: ["/logo.png"],
    creator: "@nidaannirt", // Update if official handle differs
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/logo.jpg" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdminOrLogin = pathname.startsWith("/admin") || pathname.startsWith("/login");

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        manrope.variable,
        dancingScript.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col">
        {!isAdminOrLogin && <Navbar />}
        {children}
        {!isAdminOrLogin && <FloatingSocials />}
        {!isAdminOrLogin && <Footer />}
      </body>
    </html>
  );
}