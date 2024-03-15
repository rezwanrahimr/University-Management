import { Schema, model } from 'mongoose'
import { IStudent } from './student.interface'

export const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
    require: true,
    unique: true,
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
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  dateOfBirth: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  contactNo: {
    type: String,
    require: true,
    unique: true,
  },
  emergencyContactNo: {
    type: String,
  },
  presentAddress: {
    type: String,
    require: true,
  },
  permanentAddress: {
    type: String,
    require: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  guardian: {
    required: true,
    type: {
      fatherName: {
        type: String,
        require: true,
      },
      fatherOccupation: {
        type: String,
        require: true,
      },
      fatherContactNo: {
        type: String,
        require: true,
        unique: true,
      },
      motherName: {
        type: String,
        require: true,
      },
      motherOccupation: {
        type: String,
        require: true,
      },
      motherContactNo: {
        type: String,
        require: true,
        unique: true,
      },
      address: {
        type: String,
        require: true,
      },
    },
  },
  localGuardian: {
    required: true,
    type: {
      name: {
        type: String,
        require: true,
      },
      occupation: {
        type: String,
        require: true,
      },
      contactNo: {
        type: String,
        require: true,
        unique: true,
      },
      address: {
        type: String,
        require: true,
      },
    },
  },
  profileImage: {
    type: String,
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicFaculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'academicSemester',
    required: true,
  },
})

// create student model
export const StudentModel = model<IStudent>('student', studentSchema)
