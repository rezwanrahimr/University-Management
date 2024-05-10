import { z } from 'zod'
import { gender } from './faculty.constant'

const createFacultyZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is Require' }),
    name: z.object({
      firstName: z.string({
        required_error: 'First Name is Required',
      }),
      middleName: z.string({}).optional(),
      lastName: z.string({
        required_error: 'Last Name is Required',
      }),
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: 'Gender is Require',
    }),
    dateOfBirth: z.string({ required_error: 'Date of Birth is Required' }),
    email: z.string({ required_error: 'Email is Required' }),
    contactNo: z.string({ required_error: 'Contact No is Required' }),
    emergencyContactNo: z.string({
      required_error: 'Emergency Contact No is Required',
    }),
    presentAddress: z.string({ required_error: 'Present Address is Required' }),
    permanentAddress: z.string({
      required_error: 'Permanent Address is Required',
    }),
    bloodGroup: z.string().optional(),
    profileImage: z.string().optional(),
    academicDepartment: z.object({}).optional(),
    academicFaculty: z.object({}).optional(),
  }),
})

const updateFacultyZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.object({
      firstName: z.string({}).optional(),
      middleName: z.string({}).optional(),
      lastName: z.string({}).optional(),
    }),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.string().optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherOccupation: z.string().optional(),
        motherContactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string().optional(),
        occupation: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    profileImage: z.string().optional(),
    academicDepartment: z.object({}).optional(),
    academicFaculty: z.object({}).optional(),
  }),
})

export const studentValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
}
