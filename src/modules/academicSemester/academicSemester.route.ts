import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../app/middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester
);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.updateAcademicSemester
);

export const AcademicSemesterRoutes = router;
