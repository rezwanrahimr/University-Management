import { z } from 'zod'

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'management department name is required',
    }),
  }),
})

const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'management department is required' }),
  }),
})

export const ManagementDepartmentValidation = {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
}
