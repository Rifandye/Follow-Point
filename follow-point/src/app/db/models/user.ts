import { z } from "zod";
import { getCollection } from "../config";
import { comparePass, hashPass } from "../helpers/bcrypt";
import { User, UserCreatePayload, UserLoginPayload } from "./types";
import { signToken } from "../helpers/jwt";

const UserInputSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({ required_error: "Password is required" }).min(5).max(30),
});

const UserLoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({ required_error: "Password is required" }),
});

export default class UserModel {
  static getCollection() {
    return getCollection("Users");
  }

  static async register(payload: UserCreatePayload): Promise<User> {
    const parseResult = UserInputSchema.safeParse(payload);

    if (!parseResult.success) {
      throw parseResult.error;
    }

    const existingUser = await this.getCollection().findOne({
      email: payload.email,
    });

    if (existingUser) {
      throw new Error("Email is invalid");
    }

    const timestamp = new Date();

    const result = await this.getCollection().insertOne({
      ...payload,
      password: hashPass(payload.password),
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    const createdUser = await this.getCollection().findOne({
      _id: result.insertedId,
    });

    return createdUser as User;
  }

  static async login(payload: UserLoginPayload): Promise<string> {
    const parseResult = UserLoginSchema.safeParse(payload);

    if (!parseResult.success) {
      throw parseResult.error;
    }

    const user = await this.getCollection().findOne({ email: payload.email });

    if (!user) {
      throw new Error("Account does not exist");
    }

    const hashedPass = comparePass(payload.password, user.password);

    if (!hashedPass) {
      throw new Error("Email / Password is invalid");
    }

    const access_token = signToken({
      id: user._id.toString(),
    });

    return access_token;
  }
}
