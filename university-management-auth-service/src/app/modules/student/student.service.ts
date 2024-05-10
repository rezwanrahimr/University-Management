import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { PaginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/paginations'
import { academicStudentFiltrableFields } from './student.constant'
import { IAcademicStudentFilters, IStudent } from './student.interface'
import { StudentModel } from './student.model'
import { SortOrder } from 'mongoose'

const getAllStudent = async (
  filters: IAcademicStudentFilters,
  paginationOptions: IPagination,
): Promise<IGenericResponse<IStudent[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters

    const andCondition = []
    if (searchTerm) {
      andCondition.push({
        $or: academicStudentFiltrableFields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      })
    }

    if (Object.keys(filtersData).length) {
      andCondition.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      })
    }

    const { page, limit, skip, sortBy, sortOrder } =
      PaginationHelper.calculatingPagination(paginationOptions)

    const sortCondition: { [key: string]: SortOrder } = {}
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder
    }

    let whereCondition = {}
    if (andCondition.length > 0) {
      whereCondition = { $and: andCondition }
    }

    const result = await StudentModel.find(whereCondition)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .exec()

    const total = await StudentModel.countDocuments(whereCondition)

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  } catch (error) {
    console.error('Error fetching student:', error)
    throw new Error('Failed to fetch student')
  }
}

const getSingleStudent = async (id: string) => {
  const student = await StudentModel.findById(id)
  if (student) {
    return student
  }
}

const deleteStudent = async (id: string) => {
  const student = await StudentModel.findByIdAndDelete(id)
  if (student) {
    return student
  }
}

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent> => {
  const isExist = await StudentModel.findById(id)

  if (isExist) {
    const { name, localGuardian, guardian, ...studentData } = payload
    const updatedStudentData: Partial<IStudent> = { ...studentData }

    // dynamically handling
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}` as keyof Partial<IStudent>
        ;(updatedStudentData as any)[nameKey] = name[key as keyof typeof name]
      })
    }

    if (guardian && Object.keys(guardian).length > 0) {
      Object.keys(guardian).forEach(key => {
        const guardianKey = `guardian.${key}` as keyof Partial<IStudent>
        ;(updatedStudentData as any)[guardianKey] =
          guardian[key as keyof typeof name]
      })
    }

    if (localGuardian && Object.keys(localGuardian).length > 0) {
      Object.keys(localGuardian).forEach(key => {
        const localGuardianKey =
          `localGuardian.${key}` as keyof Partial<IStudent>
        ;(updatedStudentData as any)[localGuardianKey] =
          localGuardian[key as keyof typeof name]
      })
    }

    const student = await StudentModel.findByIdAndUpdate(
      { _id: id },
      updatedStudentData,
      { new: true },
    )
    if (student) {
      return student
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error!')
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }
}

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
