import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const clientSession = req.cookies.get("aya_client_session")?.value;

  const protectedClient =
    pathname === "/home" ||
    pathname === "/search" ||
    pathname === "/profile" ||
    pathname === "/listings" ||
    pathname.startsWith("/messages") ||
    pathname.startsWith("/services");

  const clientAuthRoute =
    pathname === "/client/login" || pathname === "/client/otp";

  if (protectedClient && !clientSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/client/login";
    if (pathname) {
      url.search = `?redirect=${encodeURIComponent(pathname + search)}`;
    }
    return NextResponse.redirect(url);
  }

  // Allow visiting client auth routes even if already logged in

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home",
    "/search",
    "/profile",
    "/listings",
    "/messages/:path*",
    "/services/:path*",
    "/client/login",
    "/client/otp",
  ],
};
