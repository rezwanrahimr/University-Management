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

export const StudentService = { getAllStudent, getSingleStudent, deleteStudent }
