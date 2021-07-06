import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 65,
      default: 18,
    },
    professions: [String],
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
);

export default model("User", UserSchema); // bounded to "users" collection
