import { z } from 'zod'
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academicSemester.constant'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
      required_error: 'Title is Require',
    }),
    year: z.string({ required_error: 'Year is Require' }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'Code is Require',
    }),
    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'Start-Month is Require',
    }),
    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'End-Month is Required',
    }),
  }),
})

const updateAcademicSemesterZodSchema = z.object({
  body: z
    .object({
      title: z
        .enum([...academicSemesterTitle] as [string, ...string[]], {
          required_error: 'Title is Require',
        })
        .optional(),
      year: z.string({ required_error: 'Year is Require' }).optional(),
      code: z
        .enum([...academicSemesterCode] as [string, ...string[]], {
          required_error: 'Code is Require',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonth] as [string, ...string[]], {
          required_error: 'Start-Month is Require',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonth] as [string, ...string[]], {
          required_error: 'End-Month is Required',
        })
        .optional(),
    })
    .refine(data => (data.title && data.code) || (!data.title && !data.code), {
      message: 'either title & code should be provided or neither',
    }),
})

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
