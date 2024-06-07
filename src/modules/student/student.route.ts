import { StudentController } from "./student.controller";
import express from "express";
import { updateStudentValidationSchema } from "./student.validation";
import validateRequest from "../../app/middleware/validateRequest";

const router = express.Router();

// Will call controller function
// router.post('/create-student', StudentController.createStudent)

router.get("/", StudentController.getAllStudents);

router.patch(
  "/:id",
  validateRequest(updateStudentValidationSchema),
  StudentController.UpdateStudent,
);

router.get("/:id", StudentController.getSingleStudent);

router.delete("/:id", StudentController.deleteStudent);

export const StudentRoutes = router;
