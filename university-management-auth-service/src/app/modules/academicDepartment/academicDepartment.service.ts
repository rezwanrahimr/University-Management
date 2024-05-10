import { SortOrder } from 'mongoose'
import { PaginationHelper } from '../../../helpers/paginationHelper'
import { IPagination } from '../../../interfaces/paginations'
import { academicDepartmentSearchableFields } from './academicDepartment.constant'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface'
import { AcademicDepartmentModel } from './academicDepartment.model'

const createAcademicDepartment = async (payload: IAcademicDepartment) => {
  console.log("payload:", payload);
  const result = await AcademicDepartmentModel.create(payload)
  console.log(result);
  const populatedResult = await result.populate('academicFaculty')
  return populatedResult
}

const updateAcademicDepartment = async (
  id: string,
  payload: IAcademicDepartment,
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(
    id,
    payload,
  ).populate('academicFaculty')
  return result
}

const getSingleAcademicDepartment = async (id: string) => {
  const result =
    await AcademicDepartmentModel.findById(id).populate('academicFaculty')
  return result
}

const getAcademicDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPagination,
) => {
  const { searchTerm, ...filtersData } = filters

  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.calculatingPagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  let whereCondition = {}
  if (andCondition.length > 0) {
    whereCondition = { $and: andCondition }
  }

  const result = await AcademicDepartmentModel.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .exec()

  const total = await AcademicDepartmentModel.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const deleteAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartmentModel.findByIdAndDelete(id)
  return result
}

export const AcademicDepartmentService = {
  createAcademicDepartment,
  updateAcademicDepartment,
  getSingleAcademicDepartment,
  getAcademicDepartment,
  deleteAcademicDepartment,
}
