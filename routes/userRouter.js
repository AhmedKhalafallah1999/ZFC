import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middlewares/validateMiddleware.js";
import { autorizedPermission } from "../middlewares/authMiddleware.js";
const router = Router();
router.get("/current-user", getCurrentUser);
router.get("/application-stats",autorizedPermission, getApplicationStats);
router.patch("/update-user", validateUpdateUserInput, updateUser);
export default router;
