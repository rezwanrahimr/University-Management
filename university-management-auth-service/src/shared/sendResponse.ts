import { Response } from 'express'

type responseType<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  data: T | null
}

const sendResponse = <T>(res: Response, data: responseType<T>): void => {
  const responseData: responseType<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  }

  res.status(data.statusCode).json(responseData)
}

export default sendResponse
