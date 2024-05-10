/* import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

// STUDENT
const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null,
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementId}`

  return incrementId
}

// FACULTY
const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined
}
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')
  let incrementId = parseInt(currentId + 1)
    .toString()
    .padStart(5, '0')

  incrementId = `F-${incrementId}`

  return incrementId
}

 */

import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

// Utility function to execute a query with a timeout
const executeQueryWithTimeout = async (query: any, timeout: number) => {
  return Promise.race([
    query.exec(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), timeout),
    ),
  ])
}

// STUDENT
const findLastStudentId = async (): Promise<string | undefined> => {
  try {
    const lastStudent = await executeQueryWithTimeout(
      User.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean(),
      10000, // 10-second timeout
    )
    return lastStudent?.id ? lastStudent?.id.substring(4) : undefined
  } catch (error) {
    console.error('Error finding last student ID:', error)
    return undefined
  }
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null,
) => {
  try {
    const currentId =
      (await findLastStudentId()) || (0).toString().padStart(5, '0')
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    incrementId = `${academicSemester.year.substring(2)}${
      academicSemester.code
    }${incrementId}`
    return incrementId
  } catch (error) {
    console.error('Error generating student ID:', error)
    throw error // Rethrow the error to be handled by the caller
  }
}

// FACULTY
const findLastFacultyId = async (): Promise<string | undefined> => {
  try {
    const lastFaculty = await executeQueryWithTimeout(
      User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean(),
      10000, // 10-second timeout
    )
    return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined
  } catch (error) {
    console.error('Error finding last faculty ID:', error)
    return undefined
  }
}

export const generateFacultyId = async (): Promise<string> => {
  try {
    const currentId =
      (await findLastFacultyId()) || (0).toString().padStart(5, '0')
    let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    incrementId = `F-${incrementId}`
    return incrementId
  } catch (error) {
    console.error('Error generating faculty ID:', error)
    throw error // Rethrow the error to be handled by the caller
  }
}
