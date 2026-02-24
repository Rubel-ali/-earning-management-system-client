/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const roleAccess: Record<string, string[]> = {
  "/dashboard/super-admin": ["SUPER_ADMIN"],
  "/dashboard/users": ["ADMIN", "SUPER_ADMIN"],

  "/dashboard/instructor": ["INSTRUCTOR"],
  "/dashboard/instructor/revenue": ["INSTRUCTOR"],
  "/dashboard/instructor/analytics": ["INSTRUCTOR"],

  "/dashboard/courses/create": ["INSTRUCTOR"],
  "/dashboard/videos/create": ["INSTRUCTOR"],

  "/dashboard/courses/my-courses": ["STUDENT"],
  "/dashboard/videos": ["STUDENT"],

  "/dashboard/categories": ["ADMIN", "SUPER_ADMIN"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const currentPath = request.nextUrl.pathname;
  const loginUrl = new URL("/login", request.url);

  // ✅ Allow login page always
  if (currentPath === "/login") {
    return NextResponse.next();
  }

  // ❌ No token → redirect to login
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  let userInfo: any;

  try {
    userInfo = jwtDecode(token);
  } catch {
    return NextResponse.redirect(loginUrl);
  }

  const userRole = userInfo?.role;

  if (!userRole) {
    return NextResponse.redirect(loginUrl);
  }

  // =============================
  // STRICT ROLE CHECK
  // =============================
  for (const route in roleAccess) {
    if (currentPath.startsWith(route)) {
      const allowedRoles = roleAccess[route];

      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(
          new URL("/dashboard/unauthorized", request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};