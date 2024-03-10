import { Schema, model } from 'mongoose'
import { IAcademicFaculty } from './academicFaculty.interface'

//create academic faculty schema
const academicFacultySchema = new Schema<IAcademicFaculty>({
  title: { type: String, required: true },
})

// create academic faculty model
export const AcademicFacultyModel = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
)
