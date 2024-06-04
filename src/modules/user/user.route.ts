import express from "express";
import { UserController } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import validateRequest from "../../app/middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
