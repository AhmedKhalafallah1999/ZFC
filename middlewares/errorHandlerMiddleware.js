import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong, try again later";
  const name = err.name;
  res.status(statusCode).json({ name, msg });
};
export default errorHandlerMiddleware;
