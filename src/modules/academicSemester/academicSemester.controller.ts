import { RequestHandler } from "express";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  // will call service function to send this data
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  // Send response to user from utils
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is successfully created",
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semesters are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single academic semester is retrieved successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is updated successfully",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
