import mongoose from "mongoose";
import { Student } from "../student/student.model";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

// Business logic
const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

// Update student
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  // destructuring primitive and non-primitive fields
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  // non-primitive fields
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  // non-primitive fields
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  // non-primitive fields
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modifiedUpdateData);

  // const result = await Student.findOne({ id })
  const result = await Student.findOneAndUpdate(
    { id },
     modifiedUpdateData,
     {new: true, runValidators: true}
  )
  return result;
};

// Delete a single student from the database
// const deleteSingleStudentFromDB = async (id: string) => {
//   const session = await mongoose.startSession();

//   try {
//     // Start transaction
//     session.startTransaction();

//     // const result = await Student.findOneAndUpdate({_id :id }, { isDeleted: true });
//     // Delete student using our own custom Id
//     const deletedStudent = await Student.findOneAndUpdate(
//       { _id: id },
//       { isDeleted: true },
//       { new: true, session }
//     );

//     if (!deletedStudent) {
//       throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
//     }

//     // Delete student using our own custom Id
//     const deletedUser = await User.findOneAndUpdate(
//       { _id: id },
//       { isDeleted: true },
//       { new: true, session }
//     );

//     if (!deletedUser) {
//       throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
//     }

//     // If transaction succeeded
//     await session.commitTransaction();
//     await session.endSession();

//     return deletedStudent;
//   } catch (err) {
//     // If transaction failed
//     await session.abortTransaction();
//     await session.endSession();
//     throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
//   }
// };

const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    // commit session
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB: updateStudentIntoDB,
  deleteSingleStudentFromDB,
};
