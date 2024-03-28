import { ObjectId } from "mongodb";
import { db } from "../config";

const eventDB = db.collection("Events");

export class EventModel {
  static async getAllEvents() {
    try {
      return await eventDB.find().toArray();
    } catch (error) {
      throw error;
    }
  }

  static async getEventBySlug(slug) {
    try {
      return await eventDB.findOne({ slug });
    } catch (error) {
      throw error;
    }
  }

  static async decrementEventTickets(eventId, ticketsBody) {
    Object.entries(ticketsBody).forEach(async ([ticketId, amount]) => {
      try {
        await eventDB.updateOne(
          { _id: new ObjectId(String(eventId)), "tickets.ticketId": ticketId },
          { $inc: { "tickets.$.stock": -amount } }
        );
        console.log(
          `Successfully decreased stock for ticketId: ${ticketId} by ${amount}`
        );
      } catch (error) {
        console.error(
          `Error decreasing stock for ticketId: ${ticketId}`,
          error
        );
      }
    });
  }
}
