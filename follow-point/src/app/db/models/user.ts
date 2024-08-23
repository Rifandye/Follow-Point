import { getCollection } from "../config";

export default class UserModel {
  static getCollection() {
    return getCollection("Users");
  }

  static async register() {
    
  }
}
