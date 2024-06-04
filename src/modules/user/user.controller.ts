import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";

// Avoid repetition of try catch

// Get create student from user service
const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // will call service function to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);

  // Send response to user from utils
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is successfully created",
    data: result,
  });
});

export const UserController = {
  createStudent,
};
