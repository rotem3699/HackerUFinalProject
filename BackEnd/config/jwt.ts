import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, CookieOptions } from "express";
import * as cookie from "cookie";
import { Express } from "express";
import { SignOptions } from "jsonwebtoken";
import { ILoggedInUser } from "../controllers/authControllers";
require("dotenv").config();

export async function generateToken(user: ILoggedInUser, res: Response) {
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    profilePic: user.profilePic,
    favoriteCocktails: user.favoriteCocktails,
  };

  const maxAge = 90000;

  const options: jwt.SignOptions = {
    expiresIn: maxAge,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, options);

  res.cookie("token", accessToken, {
    httpOnly: false,
  });

  res.status(200).json({ token: accessToken });
}
