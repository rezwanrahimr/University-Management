import express, { urlencoded } from 'express'
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
app.use('/api/v1/users', UserRoutes)

app.get('/', (req, res) => {
  res.send('University Management Auth Service is Running...!')
})

// Global Errors Handler
app.use(globalErrorHandler);

export default app
