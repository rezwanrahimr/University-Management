import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiError";
import { error } from "console";
const globalErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ error: err });
    next();

    let statusCode = 500;
    let message;
    let errorMessage: IGenericErrorMessage[] = [];

    if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof ApiError) {
        statusCode = error?.statusCode;
        message = error.message;
        errorMessage = error?.message ?
            [
                {
                    path: '',
                    message: error?.message
                }
            ] : []
    } else if (error instanceof Error) {
        message = error?.message
        errorMessage = error?.errorMessage ?
            [
                {
                    path: '',
                    message: error?.message
                }
            ] : []
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config.env !== 'production' ? err?.stack : undefined
    })
}

export default globalErrorHandler;