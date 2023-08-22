import { Request, Response } from "express";
import { queryUser } from "../config/findUser";
import { generateToken } from "../config/jwt";
import { createUser } from "../config/createUser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../models/user";

export interface ILoggedInUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePic: string | undefined;
  favoriteCocktails: string[];
}
export const signIn = async (req: Request, res: Response) => {
  try {
    const foundUser = await queryUser(req.body.email);
    if (foundUser !== null && foundUser !== undefined) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );

      if (isPasswordValid) {
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
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "Couldn't find user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while signing in" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);

    if (newUser) {
      generateToken(newUser, res);
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    res.status(500).json("error");
  }
};

export const checkAuth = (req: Request, res: Response) => {
  // Return the user data decoded from the JWT token
  const token = req.cookies.token;
  if (!token) {
    // If the token is not present, the user is not authenticated
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token using your JWT secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    if (decodedToken) {
      res.json({ user: decodedToken });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    // If the token is invalid or expired, return an error
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const LogOut = async (req: Request, res: Response) => {
  try {
    // Clear the HTTP-only cookie by using the clearCookie method
    // res.clearCookie("token");

    // Set the Clear-Site-Data header to clear cookies and storage
    // res.setHeader("Clear-Site-Data", '"cookies", "storage"');

    res.cookie("token", "", { maxAge: 1 });
    // Send a success response indicating the logout was successful
    res.json({ success: true });
  } catch (error) {
    // Handle any errors that may occur during logout
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
