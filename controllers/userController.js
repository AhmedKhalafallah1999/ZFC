import userModel from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { hashedPassword } from "../utils/passwordUtils.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import postModel from "../models/postModel.js";
export const getCurrentUser = async (req, res) => {
  const currentUser = await userModel.findById(req.user.userId);
  const currentUserWithoutPassword = currentUser.RemovePassword();
  res.status(StatusCodes.OK).json(currentUserWithoutPassword);
};
export const updateUser = async (req, res) => {
  // const hashedPass = await hashedPassword(req.body.password);
  // req.body.password = hashedPass;
  // console.log(req.file.path);
  const newUser = { ...req.body };
  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = result.secure_url;
    newUser.avatarPublicId = result.public_id;
  }
  const updatedUser = await userModel.findByIdAndUpdate(
    { _id: req.user.userId },
    newUser,
    {
      new: false,
    }
  );
  // if the user uploaded another image,
  // we can check the old data to know if it contains the avatar public id

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  console.log(updatedUser);
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
