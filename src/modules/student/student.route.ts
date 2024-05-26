import { StudentController } from './student.controller'
import express from 'express'

const router = express.Router()

// Will call controller function
// router.post('/create-student', StudentController.createStudent)

router.get('/', StudentController.getAllStudents)

router.get('/:studentId', StudentController.getSingleStudent)

router.delete('/:studentId', StudentController.deleteStudent)

export const StudentRoutes = router
