import { StatusCodes } from "http-status-codes";
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class UnUthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthurizedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnAuthinticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthinticatedError";
    this.statusCode = StatusCodes.UNAUTHINTICATED;
  }
}
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForBiddenError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
