import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

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
    const paginationOptionals = {
      page: req.query.page,
      limit: req.query.limit,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    }

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
