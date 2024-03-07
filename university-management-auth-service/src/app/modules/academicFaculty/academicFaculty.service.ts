import { SortOrder } from 'mongoose'
import { PaginationHelper } from '../../../helpers/paginationHelper'
import { IPagination } from '../../../interfaces/paginations'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyModel } from './academicFaculty.model'

const createAcademicFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload)
  return result
}

const getAllAcademicFaculty = async (options: IPagination) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatingPagination(options)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await AcademicFacultyModel.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .exec()

  const total = await AcademicFacultyModel.countDocuments({})
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id)
  return result
}

const updateAcademicFaculty = async (id: string, payload: IAcademicFaculty) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate(id, payload)
  return result
}

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
