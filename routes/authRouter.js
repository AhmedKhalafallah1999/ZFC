import { Router } from "express";
const router = Router();
import { register, login, logOut } from "../controllers/authController.js";
import {
  validateRegister,
  validateLogInInputs,
} from "../middlewares/validateMiddleware.js";
router.post("/register", validateRegister, register);
router.post("/login", validateLogInInputs, login);
router.post("/logout", logOut);
export default router;
