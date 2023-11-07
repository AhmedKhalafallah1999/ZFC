import PostModel from "../models/postModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { nanoid } from "nanoid";
let posts = [
  {
    id: nanoid(),
    email: "Fan1@zamaek.com",
    name: "AhmedFan1",
    post: "I Love Zamalek",
  },
  {
    id: nanoid(),
    email: "Fan2@zamalek.com",
    name: "AhmedFan2",
    post: "I love Ubama",
  },
];
export const getAllPosts = async (req, res) => {
  const userPosts = await PostModel.find({});
  res.status(StatusCodes.OK).json({ userPosts });
};
// export const getAllFansPosts = async (req, res) => {
//   const fansPosts = await PostModel.find({});
//   res.status(StatusCodes.OK).json({ fansPosts });
// };
export const addPostController = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const postDB = await PostModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ postDB });
};
export const getSinglePost = async (req, res) => {
  const { id } = req.params;
  const userPost = await PostModel.findById(id);
  if (!userPost)
    // return res.status(StatusCodes.NO_CONTENT).json({ msg: "not valid id" });
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
  const userPost = await PostModel.findById(id);
  if (!userPost)
    // return res.status(StatusCodes.NO_CONTENT).json({ msg: "Not valid Id" });
    throw new NotFoundError("There is no Post for this Id");
  const newPosts = await PostModel.deleteOne({ _id: id });
  res.status(StatusCodes.OK).json({ msg: "Post Deleted", newPosts });
};
