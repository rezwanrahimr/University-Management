import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import { StudentModel } from '../student/student.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const newStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null | void> => {
  // set default password
  if (!user.password) {
    user.password = config.default_student_password as string
  }

  // set role
  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // generate student id
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id

    const newStudent = await StudentModel.create([student], { session })
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create student')
    }

    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user')
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

export const UserService = { newStudent }
