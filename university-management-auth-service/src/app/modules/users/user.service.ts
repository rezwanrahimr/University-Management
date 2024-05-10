import mongoose from 'mongoose'
import config from '../../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'
import { StudentModel } from '../student/student.model'
import { IFaculty } from '../faculty/faculty.interface'
import { FacultyModel } from '../faculty/faculty.model'
import { IAdmin } from '../admin/admin.interface'
import { AdminModel } from '../admin/admin.model'

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

const createFaculty = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null | void> => {
  let session
  try {
    console.log('faculty', faculty)
    // Set default password
    if (!user.password) {
      user.password = config.default_faculty_password as string
    }

    // Set role
    user.role = 'faculty'

    // Start transaction
    session = await mongoose.startSession()
    session.startTransaction()

    // Generate faculty id
    const id = await generateFacultyId()
    console.log('id', id)
    user.id = id
    faculty.id = id

    // Create faculty
    const newFaculty = await FacultyModel.create([faculty], { session })

    // Check if faculty creation failed
    if (!newFaculty.length) {
      throw new Error('Failed to create faculty')
    }

    // Assign faculty id to user
    user.faculty = newFaculty[0]._id

    // Create user
    const newUser = await User.create([user], { session })
    console.log('New user:', newUser)

    // Check if user creation failed
    if (!newUser.length) {
      throw new Error('Failed to create user')
    }

    // Commit transaction
    await session.commitTransaction()
    session.endSession()

    // Log newUserAllData for debugging
    console.log('New user all data:', newUser)

    // Populate and return newUserAllData
    const newUserAllData = await User.findById(newUser[0]._id)
      .populate({
        path: 'faculty',
        populate: [
          { path: 'academicDepartment', options: { strictPopulate: false } },
          { path: 'academicFaculty', options: { strictPopulate: false } },
        ],
      })
      .exec()

    return newUserAllData
  } catch (error) {
    console.error('Error in createFaculty:', error)
    // If a session exists, abort the transaction
    if (session) {
      await session.abortTransaction()
      session.endSession()
    }
    throw error
  }
}

const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null | void> => {
  let session
  try {
    // Set default password
    if (!user.password) {
      user.password = config.default_admin_password as string
    }

    // Set role
    user.role = 'admin'

    // Start transaction
    session = await mongoose.startSession()
    session.startTransaction()

    // Generate Admin id
    const id = await generateAdminId()
    user.id = id
    admin.id = id

    // Create admin
    const newAdmin = await AdminModel.create([admin], { session })

    // Check if admin creation failed
    if (!newAdmin.length) {
      throw new Error('Failed to create admin')
    }

    // Assign admin id to user
    user.admin = newAdmin[0]._id

    // Create user
    const newUser = await User.create([user], { session })

    // Check if user creation failed
    if (!newUser.length) {
      throw new Error('Failed to create user')
    }

    // Commit transaction
    await session.commitTransaction()
    session.endSession()

    // Populate and return newUserAllData
    const newUserAllData = await User.findById(newUser[0]._id)
      .populate({
        path: 'admin',
        populate: [
          { path: 'managementDepartment', options: { strictPopulate: false } },
        ],
      })
      .exec()

    return newUserAllData
  } catch (error) {
    console.error('Error in createAdmin:', error)
    // If a session exists, abort the transaction
    if (session) {
      await session.abortTransaction()
      session.endSession()
    }
    throw error
  }
}

export const UserService = { createStudent, createFaculty, createAdmin }
