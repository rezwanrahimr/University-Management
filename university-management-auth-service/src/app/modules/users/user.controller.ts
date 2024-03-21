import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User create success',
      data: result,
    })
    next()
  },
)

export const UserController = { createStudent }
