import express from "express";
import morgan, { format } from "morgan";
import * as dotenv from "dotenv";
import "express-async-errors";
import postRouter from "./routes/postRouter.js";
import authRouter from "./routes/authRouter.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authinticatedUser } from "./middlewares/authMiddleware.js";
import userRouter from "./routes/userRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
// Posts Route...
app.use("/api/v1/posts", authinticatedUser, postRouter);
// Auth Routes
app.use("/api/v1/auth", authRouter);
// user Routes
app.use("/api/v1/users", authinticatedUser, userRouter);
const port = process.env.PORT || 5080;
// Test:
app.use("/api/v1/test", (req, res) => {
  res.json("Data");
});

// Not found Middleware...
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});
// Error Middleware...
app.use(errorHandlerMiddleware);
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`App listen to ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
