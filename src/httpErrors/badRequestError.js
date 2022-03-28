import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { BaseError } from './baseError';

// eslint-disable-next-line import/prefer-default-export
export class BadRequestError extends BaseError {
  constructor(
    description = 'Trip is already updated',
    name = ReasonPhrases.NOT_FOUND,
    statusCode = StatusCodes.NOT_FOUND,
    isOperational = true,
  ) {
    super(name, statusCode, description, isOperational);
  }
}
