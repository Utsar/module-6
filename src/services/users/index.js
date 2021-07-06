import express from "express";
import createError from "http-errors";

import UserModel from "./schema.js";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body);
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

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(createError(500, "An error occurred while getting users' list "));
  }
});

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      res.send(user);
    } else {
      next(createError(404, `User with _id ${userId} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, "An error occurred while getting user "));
  }
});

export default usersRouter;
