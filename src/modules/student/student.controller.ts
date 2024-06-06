import { RequestHandler } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";

// Create a new controller and get all students
const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  // console.log();
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  // Send response to user from utils
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All students retrieved successfully",
    data: result,
  });
});

// Create a new controller and get a single student

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  // Send response to user from utils
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A student retrieved successfully",
    data: result,
  });
});

// Update student
// Delete student from db
const UpdateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudentFromDB(studentId, student);

  // Send response to user from utils
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

// Delete student from db
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteSingleStudentFromDB(studentId);

  // Send response to user from utils
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  UpdateStudent,
  deleteStudent,
};
