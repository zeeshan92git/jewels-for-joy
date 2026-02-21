import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // 1. Admin Protection Logic
    const isAdminPage = pathname.startsWith("/admin");
    if (isAdminPage && token?.role !== "admin") {
      // If user is logged in but NOT an admin, redirect to home
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // The middleware function above only runs if 'authorized' returns true
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login", // Redirect unauthenticated users here
    },
  }
);

export const config = { 
  // List all routes that require a login
  matcher: [
    "/admin/:path*", 
    "/profile/:path*", 
    "/checkout/:path*",
    "/cart/:path*", 
    "/orders/:path*",
    "/success/:path*" // Added success page protection
  ] 
};