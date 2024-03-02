import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPagination } from '../../../interfaces/paginations'
import { IGenericResponse } from '../../../interfaces/common'
import { PaginationHelper } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

// create academic semester service
const createAcademicSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code !')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

// update academic semester service
const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>,
) => {
  const result = await AcademicSemester.findByIdAndUpdate(id, payload)
  return result
}

// get single semester service
const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id)
  return result
}

// get academic semester service
const getAllAcademicSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPagination,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters

    const andCondition = []
    if (searchTerm) {
      andCondition.push({
        $or: academicSemesterSearchableFields.map(field => ({
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

    const result = await AcademicSemester.find(whereCondition)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .exec()

    const total = await AcademicSemester.countDocuments(whereCondition)

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  } catch (error) {
    console.error('Error fetching academic semesters:', error)
    throw new Error('Failed to fetch academic semesters')
  }
}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
