import axios from "axios";
import {  NextResponse } from "next/server";

export const middleware = (request) => {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // Redirect to login if the user tries to access profile or its sub-routes without a token
  if (!token && path.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to home if the user is logged in and tries to access the login page
  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

};


// Define routes where the middleware should be applied
export const config = {
  matcher: ["/", "/login", "/register", "/verifyemail", "/profile/:path*"],
};
