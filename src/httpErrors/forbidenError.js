/* eslint-disable import/prefer-default-export */
import { StatusCodes, getReasonPhrase, ReasonPhrases } from 'http-status-codes';
import { BaseError } from './baseError';

// eslint-disable-next-line import/prefer-default-export
export class ForbbidenError extends BaseError {
  constructor(
    description = 'Forbidden access',
    name = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN,
    isOperational = true,
  ) {
    super(name, statusCode, description, isOperational);
  }
}
