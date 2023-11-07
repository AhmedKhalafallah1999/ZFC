import userModel from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { hashedPassword } from "../utils/passwordUtils.js";
import postModel from "../models/postModel.js";
export const getCurrentUser = async (req, res) => {
  const currentUser = await userModel.findById(req.user.userId);
  const currentUserWithoutPassword = currentUser.RemovePassword();
  res.status(StatusCodes.OK).json(currentUserWithoutPassword);
};
export const updateUser = async (req, res) => {
  const hashedPass = await hashedPassword(req.body.password);
  req.body.password = hashedPass;
  const updatedUser = await userModel.findByIdAndUpdate(
    { _id: req.user.userId },
    req.body,
    {
      new: true,
    }
  );
  const updateUserWithoutPassword = updatedUser.RemovePassword();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Updated User", updateUserWithoutPassword });
};
export const getApplicationStats = async (req, res) => {
  const users = await userModel.countDocuments();
  const posts = await postModel.countDocuments();
  res.status(StatusCodes.OK).json({ posts, users });
};
