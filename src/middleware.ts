/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const roleAccess: Record<string, string[]> = {
  // =============================
  // COURSE ROUTES
  // =============================
  "/dashboard/courses/create": ["INSTRUCTOR"],
  "/dashboard/courses/my-courses": ["STUDENT", "INSTRUCTOR"],
  "/dashboard/courses": ["ADMIN", "SUPER_ADMIN", "INSTRUCTOR"],

  // =============================
  // VIDEO ROUTES
  // =============================
  "/dashboard/videos/create": ["INSTRUCTOR"],
  "/dashboard/videos": ["INSTRUCTOR", "STUDENT", "SUPER_ADMIN"],

  // =============================
  // CATEGORY ROUTES
  // =============================
  "/dashboard/categories": ["ADMIN", "SUPER_ADMIN"],

  // =============================
  // INSTRUCTOR ANALYTICS
  // =============================
  "/dashboard/instructor/revenue": ["INSTRUCTOR"],
  "/dashboard/instructor/analytics": ["INSTRUCTOR"],

  // =============================
  // ADMIN / SUPER ADMIN
  // =============================
  "/dashboard/users": ["ADMIN", "SUPER_ADMIN"],
  "/dashboard/super-admin": ["SUPER_ADMIN"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const currentPath = request.nextUrl.pathname;
  const loginUrl = new URL("/login", request.url);

  // Allow login page
  if (currentPath === "/login") {
    return NextResponse.next();
  }

  // No token → redirect
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  let userInfo: any;

  try {
    userInfo = jwtDecode(token);
  } catch  {
    return NextResponse.redirect(loginUrl);
  }

  const userRole = userInfo?.role;

  // =============================
  // ROLE CHECKING
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