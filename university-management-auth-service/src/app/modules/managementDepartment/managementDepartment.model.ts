import { Schema, model } from 'mongoose'
import { IManagementDepartment } from './managementDepartment.interface'

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: {
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
export const ManagementDepartmentModel = model<IManagementDepartment>(
  'managementDepartment',
  managementDepartmentSchema,
)
