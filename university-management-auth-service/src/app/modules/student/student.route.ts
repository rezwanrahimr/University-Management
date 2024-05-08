import express from 'express'
import { StudentController } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidation } from './student.validation'
const router = express.Router()

router.get('/', StudentController.getAllStudent)
router.get('/:id', StudentController.getSingleStudent)
router.delete('/:id', StudentController.deleteStudent)
router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  StudentController.updateStudent,
)

export const StudentRoutes = router
