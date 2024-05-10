import { Request, Response, NextFunction } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicAdminFiltrableFields } from './admin.constant'
import { AdminService } from './admin.service'

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, academicAdminFiltrableFields)
    const paginationOption = pick(req.query, paginationFields)
    const admin = await AdminService.getAllAdmin(filters, paginationOption)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Retrieved success',
      meta: admin.meta,
      data: admin.data,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const admin = await AdminService.getSingleAdmin(id)
    if (admin) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'single admin Retrieved success',
        data: admin,
      })
    }
  } catch (error) {
    next(error)
  }
}

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const admin = await AdminService.deleteAdmin(id)
    if (admin) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'admin delete success',
        data: admin,
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const payload = req.body
    const admin = await AdminService.updateAdmin(id, payload)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'admin update success',
      data: admin,
    })
  } catch (error) {
    next(error)
  }
}
export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
}
