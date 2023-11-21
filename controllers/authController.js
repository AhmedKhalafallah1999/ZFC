import bcrypt from "bcryptjs";
import user from "../models/userModel.js";
import { hashedPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/jwtUtils.js";
// import { cookie } from "express-validator";
import crypto from "crypto";
import {
  BadRequestError,
  NotFoundError,
  UnAuthinticatedError,
} from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";
export const register = async (req, res) => {
  const { name, email, location, password, bio } = req.body;
  const role = (await user.countDocuments()) === 0 ? "admin" : "user";
  const User = await user.create({
    name,
    email,
    password: await hashedPassword(password),
    location,
    role,
    bio,
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

export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.randomBytes(32).toString("hex");
  const expiarationPasswordToken = Date.now() + 60 * 60 * 3600;
  if (req.body.email === "") {
    throw new BadRequestError("sorry Enter an email");
  }
  const userReset = await user.findOne({ email: req.body.email });
  if (!userReset) {
    throw new UnAuthinticatedError(
      "sorry this email not found, create a new account"
    );
  }
  userReset.resetPasswordToken = resetPasswordToken;
  userReset.expiarationPasswordToken = expiarationPasswordToken;
  await userReset.save();
  res.json({ success: true, message: "Password reset email sent." });
};
export const enterNewPassword = async (req, res, next) => {
  const userReset = await user.findOne({
    resetPasswordToken: req.params.token,
    expiarationPasswordToken: { $gt: Date.now() },
  });
  if (userReset) {
    bcrypt.hash(req.body.password, 10, (err, hashed) => {
      if (!err) {
        userReset.password = hashed;
        userReset.resetPasswordToken = undefined;
        userReset.expiarationPasswordToken = undefined;
        userReset.save();
        res
          .status(StatusCodes.OK)
          .json({ success: true, msg: "Password successfuly updated" });
      }
    });
  }  else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "session expired" });
  }
};
