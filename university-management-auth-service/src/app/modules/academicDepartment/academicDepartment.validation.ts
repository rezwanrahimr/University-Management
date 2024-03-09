import { z } from 'zod'

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'faculty name is required' }),
    academicFaculty: z.string({ required_error: 'faculty is required' }),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
}
