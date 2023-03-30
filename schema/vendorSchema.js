import mongoose, { Schema, model } from "mongoose";

import { productModel } from "./productSchema.js";

const vendorSchema = new Schema({
  vendorName: {
    type: String,
    require: true,
  },
  shopName: {
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
  imageUrl: { type: String, default: "image_url" },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  products: { type: [mongoose.Types.ObjectId], ref: productModel },
  rating: {
    type: Number,
  },
  doorDelivery: Boolean,
  Comment: {
    type: String,
  },
  offers: {
    type: String,
  },
});

export const vendorModel = new model("vendorCollection", vendorSchema);
