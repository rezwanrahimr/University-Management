import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'
const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty,
)

router.get(
  '/get-single-academic-faculty/:id',
  AcademicFacultyController.getSingleAcademicFaculty,
)

router.get(
  '/get-all-academic-faculty',
  AcademicFacultyController.getAllAcademicFaculty,
)

export default router
