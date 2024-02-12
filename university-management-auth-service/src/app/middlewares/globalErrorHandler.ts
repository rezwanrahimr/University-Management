<<<<<<< HEAD
import { ErrorRequestHandler } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiError";

class CustomError extends Error {
    errorMessage?: IGenericErrorMessage[];

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}


const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {

    console.log("check2");
    let statusCode = 500;
    let message;
    let errorMessage: IGenericErrorMessage[] = [];

    if (error.name === "ValidationError") {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    } else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessage = error?.message
            ? [{ path: "", message: error?.message }]
            : [];
    } else if (error instanceof CustomError) {
        message = error?.message;
        errorMessage = error?.errorMessage
            ? [{ path: "", message: error?.message }]
            : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config.env !== "production" ? error?.stack : undefined,
    });
};
export default globalErrorHandler;
=======
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
import { IGenericErrorMessage } from '../../interfaces/error'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessage
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    console.log('simplifield error', simplifiedError)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
>>>>>>> b0bcc8620cbaace01981f53c441a2c7f533a3218
