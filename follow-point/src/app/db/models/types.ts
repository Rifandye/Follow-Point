import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCreatePayload = Omit<User, "_id">;
export type UserLoginPayload = Omit<User, "_id">;
