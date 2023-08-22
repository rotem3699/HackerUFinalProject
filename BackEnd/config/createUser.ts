import { IUser } from "../models/user";
import { getCollection } from "./connectMongoDB";
const User = require("../models/user");
import bcrypt from "bcrypt";

export const createUser = async (user: IUser) => {
  const defaultProfilePic =
    "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png";
  try {
    if (user.profilePic == "") {
      const { profilePic, password, ...userData } = user;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        ...userData,
        password: hashedPassword,
        profilePic: defaultProfilePic,
      });
      await newUser.save();
      return newUser;
    } else {
      const { password, ...userData } = user;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ ...userData, password: hashedPassword });
      await newUser.save();
      return newUser;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};
