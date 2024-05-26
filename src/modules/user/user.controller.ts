import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

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

    // Send response to user
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
