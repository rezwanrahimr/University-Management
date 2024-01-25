import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiError";
import { error } from "console";
const globalErrorHandler = (errors, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message;
    let errorMessage: IGenericErrorMessage[] = [];

    if (errors.name === "ValidationError") {
        const simplifiedError = handleValidationError(errors);
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
        stack: config.env !== 'production' ? errors?.stack : undefined
    })
}

export default globalErrorHandler;