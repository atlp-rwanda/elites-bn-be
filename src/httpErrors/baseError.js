export class BaseError extends Error {
  constructor(name, statusCode, message, isOperational) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}
