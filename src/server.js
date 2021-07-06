import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";

import blogsRouter from "./services/blogs/index.js";

import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler,
} from "./errorHandlers.js";

const server = express();

const port = process.env.PORT || 3001;

// ****************** MIDDLEWARES ****************************

server.use(express.json());

// ****************** ROUTES *******************************

server.use("/blogs", blogsRouter);

// ****************** ERROR HANDLERS ***********************

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(port, () => {
      console.log("Server running on port ", port);
    })
  )
  .catch((err) => console.log(err));
