import express from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
)

router.patch(
  '/update-academic-department/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
)

router.get(
  '/get-single-academic-department/:id',
  AcademicDepartmentController.getSingleAcademicDepartment,
)

router.delete(
  '/delete-academic-department/:id',
  AcademicDepartmentController.deleteAcademicDepartment,
)

router.get(
  '/get-academic-department',
  AcademicDepartmentController.getAcademicDepartment,
)

export default router
