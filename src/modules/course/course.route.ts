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

router.patch(
  "/:id",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateSingleCourse
);

router.get("/:id", CourseController.getSingleCourse);

router.get("/", CourseController.getAllCourses);

router.delete("/:id", CourseController.deleteSingleCourse);

// Course faculties
router.put(
  "/courseId/assign-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse
); //When to use put: If not available return add and if available return update

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
);


export const CourseRoutes = router;
