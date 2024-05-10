import { Schema, model } from 'mongoose'
import { IFaculty } from './faculty.interface'

const FacultySchema = new Schema<IFaculty>({
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
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  profileImage: {
    type: String,
  },
})

// create faculty model
export const FacultyModel = model<IFaculty>('faculty', FacultySchema)
