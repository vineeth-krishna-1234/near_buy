import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    default: "image_url",
  },
  location: { type: String, enum: ["Point"] },
  recentPurchase: { type: [mongoose.Types.ObjectId] },
});

export const userModel = new model("userCollection", userSchema);
