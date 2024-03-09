import { IAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartmentModel } from './academicDepartment.model'

const createAcademicDepartment = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload)
  const populatedResult = await result.populate('academicFaculty')
  return populatedResult
}

export const AcademicDepartmentService = { createAcademicDepartment }
