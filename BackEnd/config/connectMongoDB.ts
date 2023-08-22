import { MongoClient, Db, Collection } from "mongodb";

const uri = "mongodb://localhost:27017";
const dbName = "cocktail4u";
const collectionName = "users";

let db: Db;
let collection: Collection;

export async function connect() {
  console.log("started connect");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db(dbName);
    collection = db.collection(collectionName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
  return collection;
}

export async function getCollection() {
  console.log("collection here");
  await connect();
  return collection;
}
