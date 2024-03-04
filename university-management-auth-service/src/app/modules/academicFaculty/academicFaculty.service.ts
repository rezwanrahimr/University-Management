import { IPagination } from '../../../interfaces/paginations'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyModel } from './academicFaculty.model'

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload)
  return result
}

const getAllAcademicFaculty = async (options: IPagination) => {}

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
}
