import express from 'express'
import usersController from './users.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './users.validation'

const router = express.Router()

router.post('/create-user', validateRequest(UserValidation.createUserZodSchema), usersController.createUser)

export default router
