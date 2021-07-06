import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Number,
      min: 18,
      max: 65,
      default: 18,
    },
    professions: [String],
  },
  {
    timestamps: true,
  }
);

export default model("Blog", BlogSchema);
