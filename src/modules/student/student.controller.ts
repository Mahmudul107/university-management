import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";

// Create a new controller and get all students
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    // Send response to user from utils
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All students retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

// Create a new controller and get a single student

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { studentId } = req.params;
  try {
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // Send response to user from utils
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "A student retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

// Delete student from db
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    // Send response to user from utils
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
