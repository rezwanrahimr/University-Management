import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { StudentModel } from '../student/student.model'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null | void> => {
  try {
    // Log student data for debugging
    console.log('Student data:', student)

    // Set default password
    if (!user.password) {
      user.password = config.default_student_password as string
    }

    // Set role
    user.role = 'student'

    // Find academic semester
    const academicSemester = await AcademicSemester.findById(
      student.academicSemester,
    )

    // Initialize newUserAllData
    let newUserAllData = null

    // Start transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // Generate student id
      const id = await generateStudentId(academicSemester)
      user.id = id
      student.id = id

      // Create student
      const newStudent = await StudentModel.create([student], { session })
      console.log('New student:', newStudent)

      // Check if student creation failed
      if (!newStudent.length) {
        throw new Error('Failed to create student')
      }

      // Assign student id to user
      user.student = newStudent[0]._id
    } catch (error) {
      // Abort transaction and throw error
      await session.abortTransaction()
      session.endSession()
      throw new Error('Failed to create student')
    }

    try {
      // Create user
      const newUser = await User.create([user], { session })
      console.log('New user:', newUser)

      // Check if user creation failed
      if (!newUser.length) {
        throw new Error('Failed to create user')
      }

      // Assign newUserAllData
      newUserAllData = newUser[0]
    } catch (error) {
      // Abort transaction and throw error
      await session.abortTransaction()
      session.endSession()
      throw new Error('Failed to create user')
    }

    // Commit transaction
    await session.commitTransaction()
    session.endSession()

    // Log newUserAllData for debugging
    console.log('New user all data:', newUserAllData)

    // Populate and return newUserAllData
    if (newUserAllData) {
      newUserAllData = await User.findById({ id: newUserAllData.id })
        .populate({
          path: 'student',
          populate: [
            { path: 'academicSemester', options: { strictPopulate: false } },
            { path: 'academicDepartment', options: { strictPopulate: false } },
            { path: 'academicFaculty', options: { strictPopulate: false } },
          ],
        })
        .exec()
    }

    return newUserAllData
  } catch (error) {
    console.error('Error in createStudent:', error)
    throw error
  }
}

export const UserService = { createStudent }
