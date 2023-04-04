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
  googleId: { type: String },
  email: {
    type: String,
    require: true,
    match:
      /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/,
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
