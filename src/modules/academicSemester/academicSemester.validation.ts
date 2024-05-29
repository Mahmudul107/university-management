import { z } from "zod";
const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum()
  })
});

export const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
};
