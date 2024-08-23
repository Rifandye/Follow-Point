import { ObjectId } from "mongodb";
import { getCollection } from "../config";

type TicketsBody = Record<string, number>;
export class EventModel {
  static getCollection() {
    return getCollection("Events");
  }

  static async getAllEvents() {
    try {
      const events = await this.getCollection().find().toArray();
      return events;
    } catch (error) {
      throw error;
    }
  }

  static async getEventBySlug(slug: string) {
    try {
      const event = await this.getCollection().findOne({ slug });

      if (!event) {
        throw new Error("Event not found");
      }

      return event;
    } catch (error) {
      throw error;
    }
  }

  //! Need refactoring in the future
  static async decrementEventTicket(
    eventId: ObjectId,
    ticketsBody: TicketsBody
  ) {
    Object.entries(ticketsBody).forEach(async ([ticketId, amount]) => {
      try {
        await this.getCollection().updateOne(
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
