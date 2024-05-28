import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    // will call service function to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    // Send response to user from utils
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is successfully created',
    data: result
   })
  } catch (err: any) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
