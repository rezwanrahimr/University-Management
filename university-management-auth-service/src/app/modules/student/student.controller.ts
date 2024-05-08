import { Request, Response, NextFunction } from 'express'
import sendResponse from '../../../shared/sendResponse'
import { StudentService } from './student.service'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { academicStudentFiltrableFields } from './student.constant'
import { paginationFields } from '../../../constants/pagination'

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filters = pick(req.query, academicStudentFiltrableFields)
    const paginationOption = pick(req.query, paginationFields)
    const students = await StudentService.getAllStudent(
      filters,
      paginationOption,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'students Retrieved success',
      data: students,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const student = await StudentService.getSingleStudent(id)
    if (student) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'single student Retrieved success',
        data: student,
      })
    }
  } catch (error) {
    next(error)
  }
}

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const student = await StudentService.deleteStudent(id)
    if (student) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'student delete success',
        data: student,
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const payload = req.body
    const student = await StudentService.updateStudent(id, payload)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student update success',
      data: student,
    })
  } catch (error) {
    next(error)
  }
}
export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
