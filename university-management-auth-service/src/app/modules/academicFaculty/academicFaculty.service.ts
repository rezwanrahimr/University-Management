import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyModel } from './academicFaculty.model'

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload)
  return result
}

export const AcademicFacultyService = {
  createAcademicFaculty,
}
