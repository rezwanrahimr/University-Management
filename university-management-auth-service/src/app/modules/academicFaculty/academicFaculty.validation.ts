import { z } from 'zod'
const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'department name is required' }),
  }),
})

export const AcademicFacultyValidation = { createAcademicFacultyZodSchema }
