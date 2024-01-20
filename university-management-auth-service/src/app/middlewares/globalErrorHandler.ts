import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../interfaces/error";
const globalErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({ error: err });
    next();

    let statusCode = 500;
    let message;
    const errorMessage: IGenericErrorMessage[] = [];

    if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config.env !== 'production' ? err?.stack : undefined
    })
}

export default globalErrorHandler;