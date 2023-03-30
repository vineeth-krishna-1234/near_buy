import mongoose from "mongoose";
import chalk from "chalk";
import { statusLog } from "../utils/logs.js";
import * as dotenv from "dotenv";
dotenv.config();

export const mongooseConnection = () => {
  const mongoUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@nearbycluster.cvzzrfv.mongodb.net/?retryWrites=true&w=majority`;
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    statusLog("mongo connected");
  });
};
