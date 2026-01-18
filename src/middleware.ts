import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/events", "/availability", "/meetings"];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/login" || pathname === "/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/events/:path*",
    "/availability/:path*",
    "/meetings/:path*",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
