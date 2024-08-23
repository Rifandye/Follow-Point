import { ObjectId } from "mongodb";
import { getCollection } from "../config";
import { TransactionCreatePayload } from "./types";

export default class TransactionModel {
  static getCollection() {
    return getCollection("Transaction");
  }

  static async createTransaction(payload: TransactionCreatePayload) {
    try {
      const data = await this.getCollection().insertOne(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getByOrderId(orderId: string) {
    try {
      const data = await this.getCollection().findOne({ orderId });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderById(orderId: string) {
    try {
      await this.getCollection().findOneAndUpdate(
        { _id: new ObjectId(String(orderId)) },
        { $set: { paidStatus: true, paidDate: new Date() } }
      );

      return "Success Updating Data";
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId: ObjectId) {
    try {
      const agg = [
        {
          $match: {
            userId: new ObjectId(String(userId)),
          },
        },
        {
          $lookup: {
            from: "Events",
            localField: "eventId",
            foreignField: "_id",
            as: "eventInfo",
          },
        },
        {
          $unwind: {
            path: "$eventInfo",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: "Users",
            localField: "userId",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $unwind: {
            path: "$userInfo",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $project: {
            "userInfo.password": 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ];

      const transactions = await this.getCollection().aggregate(agg).toArray();
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}
