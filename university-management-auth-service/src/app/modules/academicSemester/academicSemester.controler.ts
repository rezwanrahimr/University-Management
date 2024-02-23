import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

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
    const paginationOptionals = pick(req.query, paginationFields)

    console.log(paginationOptionals)

    // const result =
    //   await AcademicSemesterService.getAllAcademicSemesters(paginationOptionals)

    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Academic Semester Retrieved success',
    //   data: result,
    // })
    // next()
  },
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
}
