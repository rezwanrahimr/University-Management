import { NextFunction, Request, Response } from 'express'
import userService from './users.service'
import { z } from "zod";

const createUser = async (req: Request, res: Response, next: NextFunction) => {


  try {
    // 
    const createUserZodSchema = z.object({
      body: z.object({
        user: z.object({
          role: z.string({
            required_error: 'Role is Required'
          }),
          password: z.string().optional()
        })
      })
    })

    await createUserZodSchema.parseAsync(req);
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user create success',
      date: result,
    })
  } catch (error) {
    next(error);
  }
}

export default { createUser }
