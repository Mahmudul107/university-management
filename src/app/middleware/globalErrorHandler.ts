import express, { NextFunction } from "express";

const globalErrorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
