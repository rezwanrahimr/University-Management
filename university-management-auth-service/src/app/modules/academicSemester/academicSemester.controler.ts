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
    try {
      const { ...academicSemesterData } = req.body
      const result =
        await AcademicSemesterService.createAcademicSemester(
          academicSemesterData,
        )
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester create success',
        data: result,
      })
    } catch (error) {
      next()
    }
  },
)
// Get Academic Semester by ID
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const result = await AcademicSemesterService.getSingleAcademicSemester(id)

      sendResponse<IAcademicSemester[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester Retrieved success',
        data: result,
      })

      next() // Proceed to the next middleware
    } catch (error) {
      next() // Pass any errors to the global error handler
    }
  },
)

// Update Academic Semester
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { ...academicSemesterUpdateData } = req.body

      const result = await AcademicSemesterService.updateAcademicSemester(
        id,
        academicSemesterUpdateData,
      )
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester update success',
        data: result,
      })
      next()
    } catch (error) {
      next(error)
    }
  },
)

//Get All Academic Semester
const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      next()
    }
  },
)

// Delete Academic Semester
const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const result = await AcademicSemesterService.deleteAcademicSemester(id)
      sendResponse<IAcademicSemester[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester Delete success',
        meta: result.meta,
        data: result.data,
      })
    } catch (error) {
      next(error)
    }
  },
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  getAllSemesters,
  deleteAcademicSemester,
}
