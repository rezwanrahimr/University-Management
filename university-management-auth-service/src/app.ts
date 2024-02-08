import express, { urlencoded } from 'express'
import usersRouter from './app/modules/users/users.route'
import academicSemester from './app/modules/academicSemester/academicSemester.route';
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app = express()

// middleware
app.use(cors())

// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))

// application route
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/academic-semesters', academicSemester)

app.get('/', (req, res) => {
  res.send('University Management Auth Service is Running...!')
})

// Global Errors Handler
app.use(globalErrorHandler);

export default app
