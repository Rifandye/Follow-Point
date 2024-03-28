import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decodeToken } from "./db/helpers/jwt";

export async function middleware(request) {
  try {
    console.log("Touched Middleware");
    let token = cookies().get("Authorization")?.value.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        {
          error: "Invalid Token",
        },
        {
          status: 401,
        }
      );
    }

    const payload = await decodeToken(token);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-id-user", payload._id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export const config = {
  matcher: ["/api/user/:path*", "/api/buy/initiate/:path*"],
};
