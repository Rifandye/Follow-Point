import { UserModel } from "@/db/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const userId = request.headers.get("x-id-user");
    const data = await UserModel.findById(userId);
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);

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
