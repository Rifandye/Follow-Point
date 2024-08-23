import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Transaction = {
  _id: ObjectId;
  orderId: string;
  userId: ObjectId;
  eventId: ObjectId;
  transactionToken: string;
  tickets: {
    ticketId: string;
    type: string;
  }[];
  paidStatus: boolean;
  paidDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCreatePayload = Omit<User, "_id">;
export type UserLoginPayload = Omit<User, "_id">;
export type TransactionCreatePayload = Omit<Transaction, "_id">;
