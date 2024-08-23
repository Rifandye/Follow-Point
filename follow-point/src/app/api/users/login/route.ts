import UserModel from "@/app/db/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await UserModel.login(payload);

    cookies().set("Authorization", `Bearer ${result}`);

    return NextResponse.json({
      access_token: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: error.errors,
      });
    }
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
