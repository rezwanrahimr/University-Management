import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ManagementDepartmentValidation } from './managementDepartment.validation'
import { ManagementDepartmentController } from './managementDepartment.controller'

const router = express.Router()

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
)

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.updateManagementDepartment,
)

router.get('/:id', ManagementDepartmentController.getSingleManagementDepartment)

router.delete('/:id', ManagementDepartmentController.deleteManagementDepartment)

router.get('/', ManagementDepartmentController.getManagementDepartment)

export const ManagementDepartmentRoutes = router
