import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI
const DB_NAME = process.env.DB_NAME 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db(DB_NAME);