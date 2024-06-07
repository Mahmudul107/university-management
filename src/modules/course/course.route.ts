import express from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseController } from "./course.controller";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse
);

router.get('/:id', CourseController.getSingleCourse)

router.get('/', CourseController.getAllCourses)

router.delete('/:id', CourseController.deleteSingleCourse)

export const CourseRoutes = router;