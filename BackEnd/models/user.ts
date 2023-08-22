import mongoose from "mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  profilePic?: string;
  favoriteCocktails?: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", required: false },
  profilePic: {
    type: String,
    required: false,
    default:
      "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png",
  },
  favoriteCocktails: { type: Array, required: false, default: [] },
});
userSchema.plugin(mongoosePaginate);
const User = mongoose.model<IUser>("User", userSchema);

module.exports = User;
