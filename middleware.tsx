// // middleware.tsx
// import { NextRequest, NextResponse } from "next/server";
// import refreshAccessToken from "./lib/refreshToken";

// const ALLOWED_DASHBOARD_ROLES = [1995, 1996];

// export async function middleware(request: NextRequest): Promise<NextResponse> {
//   const { pathname } = request.nextUrl;
//   const accessToken = request.cookies.get("accessToken");
//   const refreshToken = request.cookies.get("refreshToken");

//   // Handle /login and /register routes
//   if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
//     if (accessToken || refreshToken) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Handle /logout route
//   if (pathname.startsWith("/logout")) {
//     if (!accessToken && !refreshToken) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Handle /profile routes
//   if (pathname.startsWith("/profile")) {
//     const response = NextResponse.next();

//     if (!accessToken && refreshToken) {
//       try {
//         const newAccessToken = await refreshAccessToken(refreshToken.value);
//         response.cookies.set("accessToken", newAccessToken, {
//           secure: process.env.NODE_ENV === "production",
//           sameSite: "strict",
//           path: "/",
//           maxAge: 15 * 60, // 15 minutes
//         });
//         return response;
//       } catch {
//         response.cookies.delete("refreshToken");
//         return NextResponse.redirect(new URL("/login", request.url));
//       }
//     }

//     if (!accessToken) {
//       response.cookies.delete("refreshToken");
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     return response;
//   }

//   // Handle /dashboard routes
//   if (pathname.startsWith("/dashboard")) {
//     const response = NextResponse.next();
//   }

//   // Default: Proceed for other routes
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/register", "/profile/:path*", "/dashboard/:path*", "/logout"],
// };

// import { NextRequest, NextResponse } from "next/server";
// import refreshAccessToken from "./lib/refreshToken";
// import BASE_URL from "./api/BASE_URL";
// import dashboardNavItems from "./constants/DashboardNavLinks";

// export async function middleware(request: NextRequest): Promise<NextResponse> {
//   const { pathname } = request.nextUrl;
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   console.log(`Middleware: Path=${pathname}, AccessToken=${!!accessToken}, RefreshToken=${!!refreshToken}`);

//   // Handle /login and /register routes
//   if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
//     if (accessToken || refreshToken) {
//       console.log("Middleware: Redirecting authenticated user to home");
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Handle /logout route
//   if (pathname.startsWith("/logout")) {
//     if (!accessToken && !refreshToken) {
//       console.log("Middleware: No tokens, redirecting to home");
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Handle /profile routes
//   if (pathname.startsWith("/profile")) {
//     const response = NextResponse.next();

//     if (!accessToken && refreshToken) {
//       try {
//         console.log("Middleware: Refreshing access token for /profile");
//         const newAccessToken = await refreshAccessToken(refreshToken);
//         response.cookies.set("accessToken", newAccessToken, {
//           secure: process.env.NODE_ENV === "production",
//           sameSite: "strict",
//           path: "/",
//           maxAge: 15 * 60, // 15 minutes
//         });
//         return response;
//       } catch (error) {
//         console.error("Middleware: Failed to refresh token for /profile", error);
//         response.cookies.delete("refreshToken");
//         return NextResponse.redirect(new URL("/login", request.url));
//       }
//     }

//     if (!accessToken) {
//       console.log("Middleware: No access token for /profile, redirecting to login");
//       response.cookies.delete("refreshToken");
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     return response;
//   }

//   // Handle /dashboard routes
//   if (pathname.startsWith("/dashboard")) {
//     const response = NextResponse.next();

//     if (!accessToken && refreshToken) {
//       try {
//         console.log("Middleware: Refreshing access token for /dashboard");
//         const newAccessToken = await refreshAccessToken(refreshToken);
//         response.cookies.set("accessToken", newAccessToken, {
//           secure: process.env.NODE_ENV === "production",
//           sameSite: "strict",
//           path: "/",
//           maxAge: 15 * 60, // 15 minutes
//         });
//       } catch (error) {
//         console.error("Middleware: Failed to refresh token for /dashboard", error);
//         response.cookies.delete("refreshToken");
//         return NextResponse.redirect(new URL("/login", request.url));
//       }
//     }

//     if (!accessToken) {
//       console.log("Middleware: No access token for /dashboard, redirecting to login");
//       response.cookies.delete("refreshToken");
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     try {
//       console.log("Middleware: Fetching account details for /dashboard");
//       const res = await fetch(`${BASE_URL}/account`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         credentials: "include", // Include if API requires cookies
//       });

//       if (!res.ok) {
//         console.error(`Middleware: Account API failed with status ${res.status}`);
//         if (res.status === 401) {
//           response.cookies.delete("refreshToken");
//           return NextResponse.redirect(new URL("/login", request.url));
//         }
//         return NextResponse.redirect(new URL("/unauthorized", request.url));
//       }

//       const user = await res.json();
//       console.log("Middleware: Account API response", user);

//       const userRole = user?.role;

//       if (userRole === undefined || userRole === null) {
//         console.error("Middleware: No role found in API response", user);
//         return NextResponse.redirect(new URL("/unauthorized", request.url));
//       }

//       const matchedNavItem = dashboardNavItems.find((item) => {
//         const navPathname = new URL(item.href, request.nextUrl).pathname;
//         return navPathname === pathname && item.allowedRoles.includes(userRole);
//       });

//       if (!matchedNavItem) {
//         console.log(`Middleware: User role ${userRole} not allowed for /dashboard`);
//         return NextResponse.redirect(new URL("/", request.url)); // Keep your redirect to home
//       }

//       console.log(`Middleware: Access granted for role ${userRole}`);
//       return response;
//     } catch (error) {
//       console.error("Middleware: Failed to fetch account for /dashboard", error);
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }
//   }

//   // Default: Proceed for other routes
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/register", "/profile/:path*", "/dashboard/:path*", "/logout"],
// };

import { NextRequest, NextResponse } from "next/server";
import refreshAccessToken from "./lib/refreshToken";
import BASE_URL from "./api/BASE_URL";
import dashboardNavItems from "./constants/DashboardNavLinks";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const response = NextResponse.next();

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/logout")) {
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/profile")) {
    console.log("Middleware: Handling /profile route");
    if (!accessToken && refreshToken) {
      console.log("Middleware: No access token but refresh token exists, attempting refresh");
      try {
        await refreshAccessToken();
        console.log("Middleware: Successfully refreshed access token");
      } catch (error) {
        console.error("Middleware: Failed to refresh access token", error);
        response.cookies.delete("refreshToken");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    if (!accessToken) {
      console.log("Middleware: No access token available, redirecting to login");
      response.cookies.delete("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("Middleware: Access granted for /profile");
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/login", "/register", "/profile/:path*", "/dashboard/:path*", "/logout"],
};
