const mongoose = require("mongoose");

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected to DB!");
  } catch (error) {
    console.log(`Error connecting to DB: ${error}`);
  }
};
