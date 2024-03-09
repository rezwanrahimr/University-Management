import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AcademicDepartmentService } from './academicDepartment.service'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import httpStatus from 'http-status'
import { AcademicDepartmentModel } from './academicDepartment.model'
import ApiError from '../../../errors/ApiError'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...departmentData } = req.body
      const { title } = departmentData
      const isExist = await AcademicDepartmentModel.findOne({ title })
      if (isExist) {
        throw new ApiError(
          httpStatus.ALREADY_REPORTED,
          'Academic Department Already Exist',
        )
      }
      const result =
        await AcademicDepartmentService.createAcademicDepartment(departmentData)
      sendResponse<IAcademicDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department Create success',
        meta: result.meta,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
)

export const AcademicDepartmentController = { createAcademicDepartment }
