import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './users.validation'
import { UserController } from './user.controller'
import { AdminValidation } from '../admin/admin.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent,
)

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty,
)

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  UserController.createAdmin,
)

export default router
