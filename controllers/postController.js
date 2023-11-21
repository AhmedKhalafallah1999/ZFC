import PostModel from "../models/postModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { nanoid } from "nanoid";
export const getAllPosts = async (req, res) => {
  console.log(req.query);
  const { search, sort } = req.query;
  console.log(sort);
  const QueryObj = {};
  if (search) {
    QueryObj.$or = [{ name: { $regex: search, $options: "i" } }];
  }
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
  };
  const userPosts = await PostModel.find()
    .populate("createdBy")
    .find(QueryObj)
    .sort(sortOptions[sort]);
  res.status(StatusCodes.OK).json({ userPosts });
};
export const addPostController = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const postDB = await PostModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ postDB });
};
export const getSinglePost = async (req, res) => {
  const { id } = req.params;
  const userPost = await PostModel.findById(id);
  if (!userPost)
    throw new NotFoundError("No Post with this Id...");
  res.status(StatusCodes.OK).json({ userPost });
};
export const editPost = async (req, res) => {
  const { id } = req.params;
  const updatedPost = await PostModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "post modified", updatedPost });
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const newPosts = await PostModel.deleteOne({ _id: id });
  res.status(StatusCodes.OK).json({ msg: "Post Deleted", newPosts });
};
