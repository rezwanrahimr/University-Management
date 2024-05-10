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
      dateOfBirth: z.string({
        required_error: 'date of birth',
      }),
      gender: z.enum(['Male', 'Female'], {
        required_error: 'gender is required',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
    }),
  }),
})
const createFacultyZodSchema = z.object({
  body: z.object({
    /*  role: z.string({
      required_error: 'Role is Required',
    }), */
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth',
      }),
      gender: z.enum(['Male', 'Female'], {
        required_error: 'gender is required',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
    }),
  }),
})

const createAdminZodSchema = z.object({
  body: z.object({
    /*  role: z.string({
      required_error: 'Role is Required',
    }), */
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth',
      }),
      gender: z.enum(['Male', 'Female'], {
        required_error: 'gender is required',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
    }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
}
