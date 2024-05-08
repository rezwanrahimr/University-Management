import { z } from 'zod'
import { gender } from './student.constant'

const createStudentZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is Require' }),
    name: z.string({ required_error: 'Name is Require' }),
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
    guardian: z.object({
      fatherName: z.string({
        required_error: 'Father Name is Required',
      }),
      fatherOccupation: z.string({
        required_error: 'Father Occupation is Required',
      }),
      fatherContactNo: z.string({
        required_error: 'Father Contact No is Required',
      }),
      motherName: z.string({
        required_error: 'Mother Name is Required',
      }),
      motherOccupation: z.string({
        required_error: 'Mother Occupation is Required',
      }),
      motherContactNo: z.string({
        required_error: 'Mother Contact No is Required',
      }),
      address: z.string({
        required_error: 'Address is Required',
      }),
    }),
    localGuardian: z.object({
      name: z.string({
        required_error: 'Local Guardian name is Required',
      }),
      occupation: z.string({
        required_error: 'Occupation is Required',
      }),
      contactNo: z.string({
        required_error: 'Contact No is Required',
      }),
      address: z.string({
        required_error: 'Address is Required',
      }),
    }),
    profileImage: z.string().optional(),
    academicDepartment: z.object({}).optional(),
    academicSemester: z.object({}).optional(),
    academicFaculty: z.object({}).optional(),
  }),
})

const updateStudentZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
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
    academicSemester: z.object({}).optional(),
    academicFaculty: z.object({}).optional(),
  }),
})

export const studentValidation = {
  createStudentZodSchema,
  updateStudentZodSchema,
}
