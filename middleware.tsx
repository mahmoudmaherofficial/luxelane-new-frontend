import { NextRequest, NextResponse } from "next/server";
import refreshAccessToken from "./lib/refreshToken";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken.value);

      response.cookies.set("accessToken", newAccessToken, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60, // 15 minutes
      });

      return response;
    } catch (error) {
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

export const config = {
  matcher: "/profile/:path*",
};
