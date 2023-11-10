import {
  UnAuthinticatedError,
  UnUthorizedError,
  BadRequestError
} from "../errors/customErrors.js";
import { verifyToken } from "../utils/jwtUtils.js";
export const authinticatedUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnAuthinticatedError("Authinticated Invalid");
  try {
    const { id, role } = verifyToken(token);
    const testUser = id === "654e05c203ae676cf1866cc5";
    // save them in every request
    req.user = { userId: id, role, testUser };
  } catch (error) {
    throw new UnAuthinticatedError("Authinticated Invalid");
  }
  next();
};
export const autorizedPermission = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    throw new UnUthorizedError("Not allowed to get permission for this routes");
  }
};
export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};
