import { Router } from "express";
const router = Router();
import {
  register,
  login,
  logOut,
  resetPassword,
  enterNewPassword,
} from "../controllers/authController.js";
import {
  validateRegister,
  validateLogInInputs,
  validatePassword,
} from "../middlewares/validateMiddleware.js";
router.post("/register", validateRegister, register);
router.post("/login", validateLogInInputs, login);
router.post("/logout", logOut);
router.post("/resetpassword", resetPassword);
router.post("/reset/:token", validatePassword, enterNewPassword);

export default router;
