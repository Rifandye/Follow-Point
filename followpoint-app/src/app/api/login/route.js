import { comparePass } from "@/db/helpers/bcrypt";
import { createToken } from "@/db/helpers/jwt";
import { UserModel } from "@/db/models/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.email || body.email.trim() === "") throw { name: "EmptyEmail" };
    if (!body.password || body.password.trim() === "")
      throw { name: "EmptyPassword" };
    if (body.password.length < 8) throw { name: "PasswordLength" };

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(body.email)) throw { name: "InvalidEmail" };

    const user = await UserModel.findUserByEmail(body.email);
    if (!user) throw { name: "InvalidUser" };

    const checkPassword = comparePass(body.password, user.password);
    if (!checkPassword) throw { name: "InvalidUser" };

    const accessToken = createToken({
      _id: user._id,
    });

    cookies().set({
      name: "Authorization",
      value: `Bearer ${accessToken}`,
    });

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.log(error);
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
      case "InvalidUser":
        return NextResponse.json(
          {
            error: "Invalid email/password",
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
