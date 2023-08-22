"use strict";
// Require libraries and functions
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDatabase } = require("./config/database");
// Require routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/UserRoutes");
//const movieRoutes = require('./routes/movieRoutes');
// Activate express
const app = express();
// Use middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
// Connect to database
connectDatabase();
// Routes
app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
//app.use('/api/movies', movieRoutes);
// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
