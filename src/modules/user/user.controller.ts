import { Request, Response } from "express"
import { UserServices } from "./user.service"

const createStudent = async (req: Request, res: Response) => {
    try {
  
  
      const {password ,student: studentData } = req.body
  
      //Zod
    //   const zodParsedData = studentValidationSchema.parse(studentData)
  
      // will call service function to send this data
      const result = await UserServices.createStudentIntoDB(password, studentData)
   
  
      // Send response to user
      res.status(200).json({
        success: true,
        message: 'Student created successfully',
        data: result,
      })
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      })
    }
  }

  export const UserController = {
    createStudent,

  }