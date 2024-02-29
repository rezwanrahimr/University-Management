import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
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

// get academic semester service
const getAllAcademicSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPagination,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm } = filters
  const andCondition = [
    {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { code: { $regex: searchTerm, $options: 'i' } },
        { year: { $regex: searchTerm, $options: 'i' } },
      ],
    },
  ]

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatingPagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const result = await AcademicSemester.find({ $and: andCondition })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters,
}
