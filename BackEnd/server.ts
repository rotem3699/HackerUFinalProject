// Require libraries and functions
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/connectMongoose";
import dotenv from "dotenv";
import axios from "axios";
import { authenticateToken } from "./middleware/authentication";
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/UserRoutes");

// const cookieParser = require("cookie-parser");

dotenv.config();
// Require routes

//const movieRoutes = require('./routes/movieRoutes');

// Activate express
const app = express();
const port = process.env.PORT || 5000;

// Use middlewares
app.use(express.json());

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//     exposedHeaders: ["set-cookie"],
//   })
// );

app.use(cors({ credentials: true, origin: true }));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Connect to database
connectDatabase();

// Routes
app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);

app.get("/check-cookie", () => {
  checkCookie();
});

function checkCookie(): boolean {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`Token=`)) {
      return true;
    }
  }
  // Cookie not found
  return false;
}

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
