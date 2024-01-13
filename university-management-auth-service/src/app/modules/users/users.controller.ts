import { Request, Response } from 'express'
import userService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user create success',
      date: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'user create fail',
    })
  }
}

export default { createUser }
