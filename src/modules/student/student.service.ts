import mongoose from "mongoose";
import { Student } from "../student/student.model";
import AppError from "../../app/errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../app/builder/QueryBuilder";
import { studentSearchAbleFields } from "./student.constant";

// Business logic
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }; // Copied

  // let searchTerm = "";

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchAbleField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // Filtering items
  // const excludeFields = [
  //   "searchTerm",
  //   "sort",
  //   "limit",
  //   "page",
  //   "skip",
  //   "fields",
  // ];
  // excludeFields.forEach((el) => delete queryObj[el]);

  // console.log({ query }, { queryObj });

  // const fitterQuery = searchQuery
  //   .find(queryObj)
  //   .populate("admissionSemester")
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   });

  // Sorting
  // let sort = "-createdAt";
  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = fitterQuery.sort(sort);

  // // pagination and limiting
  // let page = 1;
  // // Limit
  // let limit = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = Number(page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // Field limiting
  // let fields = "-__v";

  // if (query.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  //   console.log({ fields });
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  // searchQuery
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.findById( id )
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
  const result = await Student.findByIdAndUpdate( id , modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
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

    const deletedStudent = await Student.findByIdAndUpdate(
       id ,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }


    // Get user _id from deletedStudent
    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate(
      userId,
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
