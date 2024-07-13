import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';


const router = express.Router();

router.get('/', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)

export const AcademicSemesterRoutes = router