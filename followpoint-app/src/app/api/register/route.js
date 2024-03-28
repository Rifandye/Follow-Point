import { UserModel } from "@/db/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || body.name.trim() === "") throw { name: "EmptyName" };
    if (!body.email || body.email.trim() === "") throw { name: "EmptyEmail" };
    if (!body.password || body.password.trim() === "")
      throw { name: "EmptyPassword" };

    await UserModel.createUser(body);

    return NextResponse.json(
      { message: "User has been created" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.name);
    if (error.code === 11000) {
      return NextResponse.json(
        {
          error: "Email must be unique",
        },
        {
          status: 400,
        }
      );
    }

    switch (error.name) {
      case "PasswordLength":
        return NextResponse.json(
          {
            error: "Password must be at least 8 characters long",
          },
          {
            status: 400,
          }
        );
        break;
      case "InvalidEmail":
        return NextResponse.json(
          {
            error: "Invalid email format",
          },
          {
            status: 400,
          }
        );
        break;
      case "EmptyName":
        return NextResponse.json(
          {
            error: "Name cannot be empty",
          },
          {
            status: 400,
          }
        );
        break;
      case "EmptyEmail":
        return NextResponse.json(
          {
            error: "Email cannot be empty",
          },
          {
            status: 400,
          }
        );
        break;
      case "EmptyPassword":
        return NextResponse.json(
          {
            error: "Password cannot be empty",
          },
          {
            status: 400,
          }
        );
        break;

      default:
        return NextResponse.json(
          {
            error: "Internal Server Error",
          },
          {
            status: 500,
          }
        );
        break;
    }
  }
}
