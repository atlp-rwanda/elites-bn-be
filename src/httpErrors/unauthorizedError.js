import { StatusCodes, getReasonPhrase, ReasonPhrases } from 'http-status-codes';
import { BaseError } from './baseError';

export class UnauthorizedError extends BaseError {
  constructor(
    description = getReasonPhrase(StatusCodes.UNAUTHORIZED),
    name = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED,
    isOperational = true,
  ) {
    super(name, statusCode, description, isOperational);
  }
}
