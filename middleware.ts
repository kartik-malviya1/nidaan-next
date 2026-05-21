import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Add x-pathname header so Server Layouts can read the current URL/path
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  const isApiGallery = pathname.startsWith("/api/gallery");
  const isApiDonation = pathname.startsWith("/api/donation");
  const isApiStats = pathname.startsWith("/api/admin/stats");
  const isApiContact = pathname.startsWith("/api/contact");

  // Determine if this API request needs admin authentication
  let apiNeedsAuth = false;
  if (isApiStats) {
    apiNeedsAuth = true;
  } else if (isApiGallery) {
    if (req.method !== "GET") {
      apiNeedsAuth = true;
    }
  } else if (isApiDonation) {
    if (req.method === "GET") {
      apiNeedsAuth = true;
    }
  } else if (isApiContact) {
    if (req.method === "GET") {
      apiNeedsAuth = true;
    }
  }

  if (apiNeedsAuth) {
    const authHeader = req.headers.get("authorization");
    let token = "";

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      token = req.cookies.get("admin-token")?.value || "";
    }

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 2. Handle Admin Page protection
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("admin-token");
      return response;
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 3. Handle Login Page check (redirect to dashboard if already authenticated)
  if (pathname.startsWith("/login")) {
    const token = req.cookies.get("admin-token")?.value;
    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    }
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/api/gallery/:path*",
    "/api/donation/:path*",
    "/api/admin/stats/:path*",
    "/api/contact/:path*",
  ],
};