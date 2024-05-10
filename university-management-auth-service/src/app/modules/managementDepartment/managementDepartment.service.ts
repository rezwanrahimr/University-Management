import { SortOrder } from 'mongoose'
import { PaginationHelper } from '../../../helpers/paginationHelper'
import { IPagination } from '../../../interfaces/paginations'
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface'
import { ManagementDepartmentModel } from './managementDepartment.model'
import { managementDepartmentSearchableFields } from './managementDepartment.constant'

const createManagementDepartment = async (payload: IManagementDepartment) => {
  const result = await ManagementDepartmentModel.create(payload)
  return result
}

const updateManagementDepartment = async (
  id: string,
  payload: IManagementDepartment,
) => {
  const result = await ManagementDepartmentModel.findByIdAndUpdate(id, payload)
  return result
}

const getSingleManagementDepartment = async (id: string) => {
  const result = await ManagementDepartmentModel.findById(id)
  return result
}

const getManagementDepartment = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPagination,
) => {
  const { searchTerm, ...filtersData } = filters

  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: managementDepartmentSearchableFields.map(field => ({
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

  const result = await ManagementDepartmentModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .exec()

  const total = await ManagementDepartmentModel.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const deleteManagementDepartment = async (id: string) => {
  const result = await ManagementDepartmentModel.findByIdAndDelete(id)
  return result
}

export const ManagementDepartmentService = {
  createManagementDepartment,
  updateManagementDepartment,
  getManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
}
