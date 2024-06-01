import express from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

// Create a new faculty
router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);

// Get all faculties
router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

// Get single Academic faculty
router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);

// Update Academic faculty
router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);


export const AcademicFacultyRoutes = router;