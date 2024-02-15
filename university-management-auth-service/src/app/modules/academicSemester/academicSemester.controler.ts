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

// Get All Academic Semester
const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    }

    const result =
      await AcademicSemesterService.getAllAcademicSemester(paginationOptions)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Retrieved Successfully!',
      data: result,
    })

    next()
  },
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
}
