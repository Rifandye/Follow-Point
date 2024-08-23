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
}
