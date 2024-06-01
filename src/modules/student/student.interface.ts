import { Model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.

// username sub-interface
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

// guardian sub-interface
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

// local guardian sub-interface
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// 1. Create an interface representing a document in MongoDB.
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress?: string;
  permanentAddress?: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
};

// For creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// For creating instances

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// Create a new Model type that knows about IUserMethods...
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >
