import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

// Create a new academicFaculty
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// Get all academicFaculty
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

// Get single AcademicFaculty
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// Update academicFaculty
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
