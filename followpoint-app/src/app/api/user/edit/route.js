import { comparePass } from "@/db/helpers/bcrypt";
import { UserModel } from "@/db/models/user";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    const emailRegex = /\S+@\S+\.\S+/;
    const body = await request.json();
    // console.log(body, "=========== raw body"); //name, email, newEmail, password, newPassword

    if (!body.name || body.name.trim() === "") throw { name: "EmptyName" };
    if (!body.email || body.email.trim() === "") throw { name: "EmptyEmail" };
    if (!emailRegex.test(body.email)) throw { name: "InvalidEmail" };
    if (!body.password || body.password.trim() === "")
      throw { name: "EmptyPassword" };
    if (body.password.length < 8) throw { name: "PasswordLength" };

    const user = await UserModel.findUserByEmail(body.email);
    if (!user) throw { name: "InvalidUser" };
    const checkPassword = comparePass(body.password, user.password);
    if (!checkPassword) throw { name: "InvalidPasswordCheck" };
    delete body.password;

    if (body.newPassword && body.newPassword.length < 8)
      throw { name: "NewPasswordLength" };
    if (!body.newEmail || body.newEmail.trim() === "")
      throw { name: "EmptyNewEmail" };
    if (!emailRegex.test(body.newEmail)) throw { name: "InvalidNewEmail" };

    await UserModel.editUser(body, user._id);
    request.headers.set("x-email-user", body.newEmail);

    return NextResponse.json({ message: "User has been edited" });
  } catch (error) {
    // console.log(error);
    if (error.code === 11000) {
        return NextResponse.json(
          {
            error: "Email already registered",
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
      case "NewPasswordLength":
        return NextResponse.json(
          {
            error: "New password must be at least 8 characters long",
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
      case "InvalidNewEmail":
        return NextResponse.json(
          {
            error: "Invalid new email format",
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
      case "EmptyNewEmail":
        return NextResponse.json(
          {
            error: "New email cannot be empty",
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
      case "InvalidPasswordCheck":
        return NextResponse.json(
          {
            error: "Wrong old password",
          },
          {
            status: 400,
          }
        );
        break;
      case "InvalidUser":
        return NextResponse.json(
          {
            error: "Wrong old email",
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
