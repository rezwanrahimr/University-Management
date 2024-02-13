import express, { urlencoded } from 'express'
<<<<<<< HEAD
=======
import usersRouter from './app/modules/users/users.route'
import academicSemester from './app/modules/academicSemester/academicSemester.route';
>>>>>>> b0bcc8620cbaace01981f53c441a2c7f533a3218
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
const app = express()

// middleware
app.use(cors())

// parser
app.use(express.json())
app.use(urlencoded({ extended: true }))

// application route
<<<<<<< HEAD
app.use('/api/v1/users', UserRoutes)
=======
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/academic-semesters', academicSemester)
>>>>>>> b0bcc8620cbaace01981f53c441a2c7f533a3218

app.get('/', (req, res) => {
  res.send('University Management Auth Service is Running...!')
})

// Global Errors Handler
app.use(globalErrorHandler);

export default app
