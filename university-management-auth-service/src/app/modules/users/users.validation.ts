import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    /*  role: z.string({
      required_error: 'Role is Required',
    }), */
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),
    }),
  }),
})

export const UserValidation = { createUserZodSchema }
