import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { ManagementDepartmentModel } from './managementDepartment.model'
import { ManagementDepartmentService } from './managementDepartment.service'
import { IManagementDepartment } from './managementDepartment.interface'
import { managementDepartmentFiltrableFields } from './managementDepartment.constant'

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...departmentData } = req.body
      const { title } = departmentData
      const isExist = await ManagementDepartmentModel.findOne({ title })
      if (isExist) {
        throw new ApiError(
          httpStatus.ALREADY_REPORTED,
          'Management Department Already Exist',
        )
      }
      const result =
        await ManagementDepartmentService.createManagementDepartment(
          departmentData,
        )
      sendResponse<IManagementDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Management Department Create success',
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
)

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { ...updateData } = req.body
      const result =
        await ManagementDepartmentService.updateManagementDepartment(
          id,
          updateData,
        )
      sendResponse<IManagementDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Management Department Update success',
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
)

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const result =
        await ManagementDepartmentService.getSingleManagementDepartment(id)
      sendResponse<IManagementDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Management Department Retrieved success',
        // meta: result.meta,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
)

const getManagementDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = pick(req.query, managementDepartmentFiltrableFields)
      const paginationOptionals = pick(req.query, paginationFields)
      const result = await ManagementDepartmentService.getManagementDepartment(
        filters,
        paginationOptionals,
      )
      sendResponse<IManagementDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Management Department Retrieved success',
        meta: result.meta,
        data: result.data,
      })
    } catch (error) {
      next(error)
    }
  },
)

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const result =
        await ManagementDepartmentService.deleteManagementDepartment(id)
      sendResponse<IManagementDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Management Department Delete success',
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
)

export const ManagementDepartmentController = {
  createManagementDepartment,
  updateManagementDepartment,
  getSingleManagementDepartment,
  getManagementDepartment,
  deleteManagementDepartment,
}
