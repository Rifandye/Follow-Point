import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { readPayloadJose } from "./app/db/helpers/jwt";

export async function middleware(request: NextRequest) {
  try {
    let token = cookies().get("Authorization")?.value.split(" ")[1];
    console.log(token);
    if (!token) {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        {
          status: 401,
        }
      );
    }

    const payload = await readPayloadJose<{ _id: string }>(token);
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
  matcher: ["/api/users/:path*", "/api/buy/initiate/:path*"],
};
