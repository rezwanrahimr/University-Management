import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterFiltrableFields } from './academicSemester.constant'

// Create Academic Semester
const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result =
      await AcademicSemesterService.createAcademicSemester(academicSemesterData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester create success',
      data: result,
    })
    next()
  },
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFiltrableFields)
    const paginationOptionals = pick(req.query, paginationFields)

    const result = await AcademicSemesterService.getAllAcademicSemesters(
      filters,
      paginationOptionals,
    )

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Retrieved success',
      meta: result.meta,
      data: result.data,
    })
    next()
  },
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
}
