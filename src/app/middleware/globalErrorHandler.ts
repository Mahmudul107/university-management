import { ErrorRequestHandler } from 'express';
import { TErrorSources } from "../interface/error.interface";
import config from "../config";
import handleZodError from "../errors/handleZodErrors";
import { ZodError } from "zod";
import handleValidationError from '../errors/handleValidationError';

// One type of error handler
// const globalErrorHandler = (
//   err: any,
//   req: express.Request,
//   res: express.Response,
//   next: NextFunction
// ) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Something went wrong";
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     error: err,
//   });
// };
// export default globalErrorHandler;

// // Another type of error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  // ultimately
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === "development" ? err?.stack : null
  });
};

export default globalErrorHandler;


//pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/
