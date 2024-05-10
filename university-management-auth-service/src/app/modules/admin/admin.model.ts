import { Schema, model } from 'mongoose'
import { IAdmin } from './admin.interface'

const AdminSchema = new Schema<IAdmin>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: {
      firstName: {
        type: String,
        require: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        require: true,
      },
    },
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  designation: {
    type: String,
    required: true,
  },
  managementDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'managementDepartment',
    required: true,
  },
  profileImage: {
    type: String,
  },
})

// create admin model
export const AdminModel = model<IAdmin>('admin', AdminSchema)
