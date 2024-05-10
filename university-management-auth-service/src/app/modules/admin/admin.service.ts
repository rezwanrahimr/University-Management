import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { PaginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/paginations'
import { SortOrder } from 'mongoose'
import { IAdmin, IAdminFilters } from './admin.interface'
import { AdminModel } from './admin.model'
import { academicAdminFiltrableFields } from './admin.constant'

const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOptions: IPagination,
): Promise<IGenericResponse<IAdmin[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters

    const andCondition = []
    if (searchTerm) {
      andCondition.push({
        $or: academicAdminFiltrableFields.map(field => ({
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

    const result = await AdminModel.find(whereCondition)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .exec()

    const total = await AdminModel.countDocuments(whereCondition)

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  } catch (error) {
    console.error('Error fetching admin:', error)
    throw new Error('Failed to fetch admin')
  }
}

const getSingleAdmin = async (id: string) => {
  const admin = await AdminModel.findById(id)
  if (admin) {
    return admin
  }
}

const deleteAdmin = async (id: string) => {
  const admin = await AdminModel.findByIdAndDelete(id)
  if (admin) {
    return admin
  }
}

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin> => {
  const isExist = await AdminModel.findById(id)

  if (isExist) {
    const { name, ...adminData } = payload
    const updatedAdminData: Partial<IAdmin> = { ...adminData }

    // dynamically handling
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}` as keyof Partial<IAdmin>
        ;(updatedAdminData as any)[nameKey] = name[key as keyof typeof name]
      })
    }

    const admin = await AdminModel.findByIdAndUpdate(
      { _id: id },
      updatedAdminData,
      { new: true },
    )
    if (admin) {
      return admin
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error!')
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin not found')
  }
}

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
}
