import { Request, Response, NextFunction } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicFacultyFiltrableFields } from './faculty.constant'
import { FacultyService } from './faculty.service'

const getAllFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filters = pick(req.query, academicFacultyFiltrableFields)
    const paginationOption = pick(req.query, paginationFields)
    const faculty = await FacultyService.getAllFaculty(
      filters,
      paginationOption,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty Retrieved success',
      meta: faculty.meta,
      data: faculty.data,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const faculty = await FacultyService.getSingleFaculty(id)
    if (faculty) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'single faculty Retrieved success',
        data: faculty,
      })
    }
  } catch (error) {
    next(error)
  }
}

const deleteFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const faculty = await FacultyService.deleteFaculty(id)
    if (faculty) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'faculty delete success',
        data: faculty,
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const payload = req.body
    const faculty = await FacultyService.updateFaculty(id, payload)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty update success',
      data: faculty,
    })
  } catch (error) {
    next(error)
  }
}
export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
}
