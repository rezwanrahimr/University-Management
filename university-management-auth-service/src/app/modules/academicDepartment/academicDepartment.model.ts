import mongoose, { Schema, model } from 'mongoose'
import { IAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: { type: String, required: true, unique: true },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  { strict: false },
)

// 3. Create a Model.
export const AcademicDepartmentModel = model<IAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
)
