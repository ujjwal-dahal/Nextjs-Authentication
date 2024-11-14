import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // Redirect to login if the user tries to access profile without a token
  if (!token && path === "/profile") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to home if the user is logged in and tries to access the login page
  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check if user is verified only if they try to access the verifyemail page

  //token cha tara pani verifyemail ma jancha bhane home page
  if (token && path === "/verifyemail") {
    const isUserVerified : any = getUserVerificationStatus(token, request);

    if (isUserVerified ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
};

// Helper function to synchronously call an API route for verification status
async function getUserVerificationStatus(token: string, request: NextRequest){
  try {
    const response = await axios.post("/api/users/verifyemail",{token})

    let data = response.data;
    return data?.isVerified || false;
  } catch (error) {
    console.error("Verification check failed:", error);
    return false;
  }
}

// Define routes where the middleware should be applied
export const config = {
  matcher: ["/", "/login", "/register", "/verifyemail", "/profile"],
};
