import express from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

// Create department
router.post(
  "/create-academic-department",
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

// Get all departments
router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);

// Get single department
router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

// update department
router.patch(
  "/:departmentId",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
