import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    googleId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email:{
  type:String,
  required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
 
  export const userModels = new model("user", UserSchema);