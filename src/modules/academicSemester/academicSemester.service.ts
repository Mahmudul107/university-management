import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

  // Validation: semester name <=> semester code
  type TAcademicSemesterNameCodeMapper = {
    [key: string]: string;
  };

  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: "01",
    summar: "02",
    Fall: "03",
  };

  // AcademicSemesterNameCodeMapper['Fall]: "03",
  if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new Error ('Invalid academic semester code')
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
