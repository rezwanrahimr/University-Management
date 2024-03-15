import { InferSchemaType } from 'mongoose'
import { studentSchema } from './student.model'
export type IStudent = InferSchemaType<typeof studentSchema>
