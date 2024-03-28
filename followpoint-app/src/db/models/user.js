import { ObjectId } from "mongodb";
import { db } from "../config";
import { hashPass } from "../helpers/bcrypt";

const userDB = db.collection("Users");

export class UserModel {
  static async createUser({ name, email, password }) {
    await userDB.createIndex({ email: 1 }, { unique: true });
    try {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) throw { name: "InvalidEmail" };
      if (password.length < 8) throw { name: "PasswordLength" };
      await userDB.insertOne({
        name,
        email,
        password: hashPass(password),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }

  static async findUserByEmail(email) {
    return await userDB.findOne({ email });
  }

  static async findById(id) {
    return await userDB.findOne({ _id: new ObjectId(String(id)) });
  }

  static async editUser(body, userId) {
    try {
      if (body.newPassword) {
        const { name, newEmail, newPassword } = body;
        await userDB.updateOne(
          { _id: userId },
          { $set: { name, email: newEmail, password: hashPass(newPassword) } }
        );
      } else {
        const { name, newEmail } = body;
        await userDB.updateOne(
          { _id: userId },
          { $set: { name, email: newEmail } }
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
