import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { BaseError } from './baseError';

// eslint-disable-next-line import/prefer-default-export
export class ConflictsError extends BaseError {
  constructor(
    description = 'User already exists',
    name = ReasonPhrases.CONFLICT,
    statusCode = StatusCodes.CONFLICT,
    isOperational = true,
  ) {
    super(name, statusCode, description, isOperational);
  }
}
