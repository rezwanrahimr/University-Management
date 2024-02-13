import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user create success',
      date: result,
    })
  } catch (error) {
    console.log('Check 1')
    next(error)
  }
}

export const UserController = { createUser }
