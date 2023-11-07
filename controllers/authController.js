import bcrypt from "bcryptjs";
import user from "../models/userModel.js";
import { hashedPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/jwtUtils.js";
// import { cookie } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnAuthinticatedError,
} from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";
export const register = async (req, res) => {
  const { name, email, location, password,bio } = req.body;
  const role = (await user.countDocuments()) === 0 ? "admin" : "user";
  const User = await user.create({
    name,
    email,
    password: await hashedPassword(password),
    location,
    role,
    bio
  });
  res.status(StatusCodes.CREATED).json({ msg: User });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const User = await user.findOne({ email });
  const isCorrectAuth =
    User && (await comparePassword(password, User.password));
  if (!isCorrectAuth) throw new UnAuthinticatedError("invalid credentials");
  const token = createJWT({
    id: User._id,
    role: User.role,
  });
  const oneDay = 1000 * 24 * 60 * 60;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "logged in" });
};
export const logOut = (req, res) => {
  res.cookie("token", "logOut", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json("User Logged Out");
};
