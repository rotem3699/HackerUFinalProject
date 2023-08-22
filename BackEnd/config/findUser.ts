import { IUser } from "../models/user";
import { connect, getCollection } from "./connectMongoDB";

export const queryUser = async (userToSearch: string) => {
  try {
    const collection = await getCollection();
    const user = await collection.findOne({
      email: userToSearch,
    });
    return user;
  } catch (error) {
    console.error("Error querying user:", error);
  }
};
