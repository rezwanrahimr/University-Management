import express, { urlencoded } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes/index'
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

export default app
