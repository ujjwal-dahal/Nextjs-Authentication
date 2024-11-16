import { NextResponse } from "next/server"
import GetCookieValue from "../../../../helpers/getCookieValue"

export const GET = async (request) => {
  try {
    const cookieData = GetCookieValue(request);
    if (!cookieData) {
      return NextResponse.json({
        message: "No Token Found"
      });
    }

    return NextResponse.json({
      cookieData: cookieData
    });

  } catch (error) {
    return NextResponse.json({
      error: error.message
    });
  }
};
