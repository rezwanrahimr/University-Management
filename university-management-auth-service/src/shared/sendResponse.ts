import { Response } from 'express'

type responseType<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
}

const sendResponse = <T>(res: Response, data: responseType<T>): void => {
  const responseData: responseType<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null,
    data: data.data || null,
  }

  res.status(data.statusCode).json(responseData)
}

export default sendResponse
