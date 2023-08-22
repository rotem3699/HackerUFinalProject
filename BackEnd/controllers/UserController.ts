import { Request, Response } from "express";
import { generateToken } from "../config/jwt";
import { getCollection } from "../config/connectMongoDB";
import { ILoggedInUser } from "./authControllers";
import { queryUser } from "../config/findUser";
import { ObjectId } from "mongodb";
import { all } from "axios";

export const UpdateCocktails = async (req: Request, res: Response) => {
  try {
    await updateUserFavoriteCocktails(
      req.body.email,
      req.body.favoriteCocktails
    ).then(async () => {
      const foundUser = await queryUser(req.body.email);
      if (foundUser) {
        var userToReturn: ILoggedInUser = {
          firstName: foundUser.firstName,
          email: foundUser.email,
          lastName: foundUser.lastName,
          role: foundUser.role,
          profilePic: foundUser.profilePic,
          favoriteCocktails: foundUser.favoriteCocktails,
        };
        generateToken(userToReturn, res);
      } else {
        res.status(500).json({ error: "failed getting user information" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Could not update cocktails" });
  }
};

export const updateUserFavoriteCocktails = async (
  email: string,
  newFavoriteCocktails: string[]
) => {
  try {
    const collection = await getCollection();
    // Check if the user exists
    const existingUser = await collection.findOne({ email: email });
    if (!existingUser) {
      return false;
    }

    const updatedUser = await collection.updateOne(
      { email: email },
      { $set: { favoriteCocktails: newFavoriteCocktails } }
    );

    // Check if the update was successful
    if (updatedUser.modifiedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error updating user favorite cocktails:", error);
    return false;
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const collection = await getCollection();
    const allUsers = await collection.find().toArray();
    res.send(allUsers);
  } catch (error) {
    console.error("Error querying users: ", error);
    res.status(500).send({ error: "An error occurred while querying users" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.query.id as string;
  const collection = await getCollection();

  const deletedUser = await collection.deleteOne({ _id: new ObjectId(userId) });

  if (deletedUser.deletedCount === 1) {
    res.status(200).json({ message: "User Deleted Successfully" });
  } else {
    res.status(500).json({ error: "error deleting user" });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const userId = req.query.id as string;
  const userRoleToUpdate = req.query.role as string;
  const collection = await getCollection();
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: userRoleToUpdate } }
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "User role updated successfully!" });
    } else {
      res.status(404).json({ error: "user not found or role not updated" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "couldnt update user role." });
  }
};
