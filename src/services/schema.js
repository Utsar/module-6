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
    cover: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      propertites: {
        name: { type: String },
        avatar: { type: String },
      },
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Blog", BlogSchema);
