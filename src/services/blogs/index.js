import express from "express";
import createError from "http-errors";

import BlogModel from "../schema.js";

const blogsRouter = express.Router();

// POST - post a blog

blogsRouter.post("/", async (req, res, next) => {
  try {
    const newBlog = new BlogModel(req.body);
    const { _id } = await newBlog.save();

    res.status(201).send({ _id });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(createError(400, error));
    } else {
      console.log(error);
      next(createError(500, "An error occurred while creating new blog"));
    }
  }
});

// GET - get all blogs

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await BlogModel.find();
    res.send(blogs);
  } catch (error) {
    next(createError(500, "An error occurred while getting blogs' list "));
  }
});

// GET - get single blog

blogsRouter.get("/:blogId", async (req, res, next) => {
  try {
    const blogId = req.params.blogId;

    const blog = await BlogModel.findById(blogId);

    if (blog) {
      res.send(blog);
    } else {
      next(createError(404, `blog with _id ${blogId} not found!`));
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting blog "));
  }
});

// DELETE - delete blog

blogsRouter.delete("/:blogId", async (req, res, next) => {
  try {
    const blogId = req.params.blogId;

    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

    if (deletedBlog) {
      res.status(204).send();
    } else {
      next(createError(404, `blog with _id ${blogId} not found!`));
    }
  } catch (error) {
    next(
      createError(
        500,
        `An error occurred while deleting blog ${req.params.blogId}`
      )
    );
  }
});

// PUT - edit blog

blogsRouter.put("/:blogId", async (req, res, next) => {
  try {
    const blogId = req.params.blogId;

    const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
    });

    if (updatedBlog) {
      res.send(updatedBlog);
    } else {
      next(createError(404, `Blog with _id ${blogId} not found!`));
    }
  } catch (error) {
    next(
      createError(
        500,
        `An error occurred while updating blog ${req.params.blogId}`
      )
    );
  }
});

export default blogsRouter;
