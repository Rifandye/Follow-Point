import { getCollection } from "../config";

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
}
