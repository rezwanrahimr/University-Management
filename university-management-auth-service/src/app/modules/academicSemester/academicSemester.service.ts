import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOptions } from '../../../interfaces/paginations'

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

// get all academic semester service
const getAllAcademicSemester = (paginationOptions: IPaginationOptions) => {}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemester,
}
