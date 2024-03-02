import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controler'

const router = express.Router()

router.post(
  '/create-academic-semesters',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester,
)
router.get(
  '/get-single-academic-semester/:id',
  AcademicSemesterController.getSingleAcademicSemester,
)
router.patch(
  '/update-academic-semester/:id',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester,
)
router.get(
  '/get-all-academic-semesters',
  AcademicSemesterController.getAllSemesters,
)

export default router
