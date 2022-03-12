import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { BaseError } from "./baseError";

export class PageNotFoundError extends BaseError {
    constructor(
        description = 'Page Requested not found',
        name = ReasonPhrases.NOT_FOUND, 
        statusCode = StatusCodes.NOT_FOUND, 
        isOperational = true, 
    ) {
        super(name, statusCode, description, isOperational);
    }
}