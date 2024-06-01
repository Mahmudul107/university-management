import { NextFunction, Request, RequestHandler, Response } from "express";


// Avoid code repetition using Higher Order Functions: hook
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log(err);
      next(err)
    });
  };
};

export default catchAsync;
