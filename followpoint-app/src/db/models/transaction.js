import { ObjectId } from "mongodb";
import { db } from "../config";

const transactionDB = db.collection("Transactions");

export class TransactionModel {
  static async createTransaction(data) {
    try {
      await transactionDB.insertOne(data);
    } catch (error) {
      throw error;
    }
  }

  static async findByOrderId(orderId) {
    try {
      return await transactionDB.findOne({ orderId });
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderById(orderId) {
    try {
      const data = await transactionDB.findOne({ orderId });
      await transactionDB.updateOne(
        { _id: new ObjectId(String(data._id)) },
        { $set: { paidStatus: true, paidDate: new Date() } }
      );
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId) {
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

      const transactions = await transactionDB.aggregate(agg).toArray();
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}
