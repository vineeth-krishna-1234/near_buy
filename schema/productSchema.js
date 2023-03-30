import mongoose, { Schema, model } from "mongoose";

export const productSchema = new Schema({
  itemName: {
    type: String,
    require: true,
  },
  itemPrice: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  shopId: { type: mongoose.Types.ObjectId, require: true },
  expDate: { type: Date },
});

export const productModel = new model("productCollection", productSchema);
