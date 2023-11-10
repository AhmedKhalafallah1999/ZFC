import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validateMiddleware.js";
import {
  autorizedPermission,
  checkForTestUser,
} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
const router = Router();
router.get("/current-user", getCurrentUser);
router.get(
  "/admin/application-stats",
  autorizedPermission,
  getApplicationStats
);
router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUserInput,
  checkForTestUser,
  updateUser
);
export default router;
