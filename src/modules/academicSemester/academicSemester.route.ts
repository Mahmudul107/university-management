import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../app/middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

// Create academic semester
router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

// Get all academic semesters
router.get("/", AcademicSemesterController.getAllAcademicSemesters);

// Get single academic semester
router.get(
  "/:semesterId",
  AcademicSemesterController.getSingleAcademicSemester
);

// Get update academic semester
router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.updateAcademicSemester
);

export const AcademicSemesterRoutes = router;
