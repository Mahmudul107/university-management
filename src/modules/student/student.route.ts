import { StudentController } from './student.controller'
import express from 'express'
import { updateStudentValidationSchema } from './student.validation'
import validateRequest from '../../app/middleware/validateRequest'

const router = express.Router()

// Will call controller function
// router.post('/create-student', StudentController.createStudent)

router.get('/', StudentController.getAllStudents)

router.patch('/:studentId', validateRequest(updateStudentValidationSchema), StudentController.UpdateStudent)

router.get('/:studentId', StudentController.getSingleStudent)

router.delete('/:studentId', StudentController.deleteStudent)

export const StudentRoutes = router
