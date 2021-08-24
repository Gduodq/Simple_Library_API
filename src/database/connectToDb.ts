import { MongoClient } from "mongodb";

const mongoHost = process.env.MONGO_HOST || "localhost";
const mongoPort = process.env.MONGO_PORT || "27017";
const mongoUsername = process.env.MONGO_USERNAME || null;
const mongoPassword = process.env.MONGO_PASSWORD || null;
const mongoAuthUrl =
  mongoUsername || mongoPassword ? `${mongoUsername}:${mongoPassword}@` : "";

const dbUrl = `mongodb://${mongoAuthUrl}${mongoHost}:${mongoPort}/`;

export const connectToDb = async () => {
  const client = new MongoClient(dbUrl);
  await client.connect();
  const newDb = client.db("library");
  return newDb;
};
