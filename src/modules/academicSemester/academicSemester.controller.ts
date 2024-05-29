import { RequestHandler } from "express";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";


const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {

  // will call service function to send this data
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  // Send response to user from utils
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is successfully created",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
