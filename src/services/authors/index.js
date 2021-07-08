import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo";

import AuthorModel from "./schema.js";

const authorsRouter = express.Router();

authorsRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new AuthorModel(req.body);
    const { _id } = await newUser.save();

    res.status(201).send({ _id });
  } catch (error) {
    if (error.name === "ValidationError") {
      next(createError(400, error));
    } else {
      console.log(error);
      next(createError(500, "An error occurred while creating new user"));
    }
  }
});

authorsRouter.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query);
    console.log(query);

    const total = await AuthorModel.countDocuments(query.criteria);
    const books = await AuthorModel.find(query.criteria, query.options.fields)
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort);

    res.send({ links: query.links("/books", total), total, books });
  } catch (error) {
    next(createError(500, "An error occurred while getting books' list "));
  }
});

authorsRouter.get("/:bookId", async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

    const user = await AuthorModel.findById(bookId);

    if (user) {
      res.send(user);
    } else {
      next(createError(404, `User with _id ${bookId} not found!`));
    }
  } catch (error) {
    next(createError(500, "An error occurred while getting user "));
  }
});

authorsRouter.delete("/:bookId", async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

    const deletedUser = await AuthorModel.findByIdAndDelete(bookId);

    if (deletedUser) {
      res.status(204).send();
    } else {
      next(createError(404, `User with _id ${bookId} not found!`));
    }
  } catch (error) {
    next(
      createError(
        500,
        `An error occurred while deleting user ${req.params.bookId}`
      )
    );
  }
});

authorsRouter.put("/:bookId", async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

    const updatedUser = await AuthorModel.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (updatedUser) {
      res.send(updatedUser);
    } else {
      next(createError(404, `User with _id ${bookId} not found!`));
    }
  } catch (error) {
    next(
      createError(
        500,
        `An error occurred while updating user ${req.params.bookId}`
      )
    );
  }
});

export default authorsRouter;
