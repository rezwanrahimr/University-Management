import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
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

const getAllAcademicSemesters = async (
  paginationOptions: IPagination,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatingPagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  console.log('test code', page, limit, skip, sortBy, sortOrder)
  const result = await AcademicSemester.find()
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
