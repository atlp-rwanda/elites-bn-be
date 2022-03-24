/* eslint-disable import/prefer-default-export */
import { StatusCodes, getReasonPhrase, ReasonPhrases } from 'http-status-codes';
import { BaseError } from './baseError';

export class ForbbidenError extends BaseError {
  constructor(
    description = getReasonPhrase(StatusCodes.FORBIDDEN),
    name = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN,
    isOperational = true,
  ) {
    super(name, statusCode, description, isOperational);
  }
}
