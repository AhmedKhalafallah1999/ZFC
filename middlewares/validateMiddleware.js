import { body, validationResult, param } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnAuthinticatedError,
  UnUthorizedError,
} from "../errors/customErrors.js";
import mongoose from "mongoose";
import user from "../models/userModel.js";
import postModel from "../models/postModel.js";
const validateHandler = (validate) => {
  return [
    validate,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        // let validationMsg = errorsArray[0].msg;
        console.log(errorsArray);
        let validationMsg = errorsArray.map((msg) => {
          return msg.msg;
        });
        throw new BadRequestError(validationMsg);
      }
      next();
    },
  ];
};
export const validateCreatePostInputs = validateHandler([
  body("post").notEmpty().withMessage("Please provide a Post").trim(),
]);
export const validateIdParam = validateHandler([
  param("id").custom(async (value, { req }) => {
    const isValidIdParam = mongoose.Types.ObjectId.isValid(value);
    if (!isValidIdParam) throw new BadRequestError("invalid MongoDB id");
    const post = await postModel.findById(value);
    const isAdmin = req.user.role === "admin";
    if (!post) throw new NotFoundError("No post with this Id");
    const isOwner = req.user.userId === post.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnUthorizedError("not authorized to access this route");
  }),
]);
export const validateRegister = validateHandler([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .trim()
    .isLength({ min: 6, max: 12 })
    .withMessage("Please make your name between 6 to 12 charecters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("It's not a valid email")
    .custom(async (email) => {
      const User = await user.findOne({ email });
      if (User)
        throw new BadRequestError("sorry, this email belongs to another fan");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("bio").notEmpty().withMessage("bio is Required for identify"),
]);
export const validateLogInInputs = validateHandler([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Is not a valid email")
    .custom(async (email) => {
      const User = await user.findOne({ email });
      if (!User) throw new BadRequestError("sorry, Create an account first...");
    }),
  body("password").notEmpty().withMessage("password is required"),
]);
export const validateUpdateUserInput = validateHandler([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await user.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
