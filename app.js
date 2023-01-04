require("./config/config");
require("express-async-errors");
const connectDB = require("./config/db");
// async errors

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const indexRouter = require("./routes/index");

const express = require("express");
const app = express();

//

//Middleware
app.use(express.json());

// Routes
app.use("/", indexRouter);

//Error Handler
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 7240;

const start = async () => {
  try {
    // Connect MongoDB
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${port}`
      )
    );
  } catch (error) {
    console.log("Something went wrong");
  }
};

process.env.NODE_ENV === "test" ? (module.exports = app) : start();
