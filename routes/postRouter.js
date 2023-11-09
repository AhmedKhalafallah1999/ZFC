import { Router } from "express";
const router = Router();
import {
  addPostController,
  getSinglePost,
  editPost,
  deletePost,
  getAllPosts,
} from "../controllers/postController.js";
import {
  validateCreatePostInputs,
  validateIdParam,
} from "../middlewares/validateMiddleware.js";
router.get("/get-all-posts", getAllPosts);
router.post("/add-post", validateCreatePostInputs, addPostController);
router.get("/get-post/:id", validateIdParam, getSinglePost);
router.patch("/edit-post/:id", validateIdParam, editPost);
router.delete("/delete-post/:id", validateIdParam, deletePost);
export default router;
