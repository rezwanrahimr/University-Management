import { z } from 'zod'

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'faculty name is required' }),
    academicFaculty: z.string({ required_error: 'faculty is required' }),
  }),
})

const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'faculty name is required' }).optional(),
    academicFaculty: z
      .string({ required_error: 'faculty is required' })
      .optional(),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
}
