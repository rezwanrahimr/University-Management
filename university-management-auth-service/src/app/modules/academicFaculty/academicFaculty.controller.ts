import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AcademicFacultyService } from './academicFaculty.service'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicFaculty } from './academicFaculty.interface'
import httpStatus from 'http-status'
import { AcademicFacultyModel } from './academicFaculty.model'
import ApiError from '../../../errors/ApiError'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...academicFacultyData } = req.body
      const { title } = academicFacultyData

      // check the academic faculty is already exist!
      const isExist = await AcademicFacultyModel.findOne({ title })
      if (isExist) {
        throw new ApiError(
          httpStatus.ALREADY_REPORTED,
          'Academic Faculty is Already Exist !',
        )
      }

      const result =
        await AcademicFacultyService.createAcademicFaculty(academicFacultyData)
      console.log('test data', result)
      sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty Create success',
        meta: result.meta,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
)

export const AcademicFacultyController = { createAcademicFaculty }
