import { StatusCodes, getReasonPhrase, ReasonPhrases } from 'http-status-codes';
import { BaseError } from './baseError.js';

// eslint-disable-next-line import/prefer-default-export
export class InternalServerError extends BaseError {
  constructor(
    description = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    name = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational = true,
  ) {
    super(name, statusCode, description, isOperational);
  }
}
