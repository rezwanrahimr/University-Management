import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPagination } from '../../../interfaces/paginations'


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

const getAllAcademicSemesters = async (paginationOptions: IPagination) => {}

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters}
