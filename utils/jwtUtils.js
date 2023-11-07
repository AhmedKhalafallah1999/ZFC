import Jwt from "jsonwebtoken";
export const createJWT = (payloads) => {
  const token = Jwt.sign(payloads, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRESIN,
  });
  return token;
};
export const verifyToken = (token) => {
  const encoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
  return encoded;
};
