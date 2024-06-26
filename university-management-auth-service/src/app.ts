import express, { NextFunction, Request, Response, urlencoded } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes/index'
import httpStatus from 'http-status'
import {
  generateFacultyId,
  generateStudentId,
} from './app/modules/users/user.utils'
const app = express()

// middleware
app.use(cors())

// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))

// application route
app.use('/api/v1', routes)

app.get('/', (req, res) => {
  res.send('University Management Auth Service is Running...!')
})

// Global Errors Handler
app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

const generateStudentTest = async () => {
  const testId = generateFacultyId()
  console.log('test id', testId)
}
generateStudentTest()
export default app
