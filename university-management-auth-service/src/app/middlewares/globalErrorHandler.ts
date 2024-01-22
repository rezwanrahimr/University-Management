import { ErrorRequestHandler } from "express";
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(400).json({ error: error });
    next();
}

export default globalErrorHandler;