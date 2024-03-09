import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AcademicDepartmentService } from './academicDepartment.service'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import httpStatus from 'http-status'
import { AcademicDepartmentModel } from './academicDepartment.model'
import ApiError from '../../../errors/ApiError'
import { academicDepartmentFiltrableFields } from './academicDepartment.constant'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

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

const getAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, academicDepartmentFiltrableFields)
      const paginationOptionals = pick(req.query, paginationFields)
      const result = await AcademicDepartmentService.getAcademicDepartment(
        filters,
        paginationOptionals,
      )
      sendResponse<IAcademicDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department Retrieved success',
        meta: result.meta,
        data: result.data,
      })
    } catch (error) {
      next(error)
    }
  },
)

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
}
