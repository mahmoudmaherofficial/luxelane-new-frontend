import { NextRequest, NextResponse } from "next/server";
import refreshAccessToken from "./lib/refreshToken";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  // Handle /login and /register routes
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Handle /profile routes
  if (pathname.startsWith("/profile")) {
    const response = NextResponse.next();

    if (!accessToken && refreshToken) {
      try {
        const newAccessToken = await refreshAccessToken(refreshToken.value);
        response.cookies.set("accessToken", newAccessToken, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 15 * 60, // 15 minutes
        });
        return response;
      } catch {
        response.cookies.delete("refreshToken");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    if (!accessToken) {
      response.cookies.delete("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  }

  // Default: Proceed for other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/profile/:path*"],
};

