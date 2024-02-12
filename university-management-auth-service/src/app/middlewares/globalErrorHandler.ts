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