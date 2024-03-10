import mongoose, { Schema, model } from 'mongoose'
import { IAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    syncId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

// 3. Create a Model.
export const AcademicDepartmentModel = model<IAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
)
