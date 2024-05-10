import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { PaginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/paginations'
import { IAcademicFacultyFilters, IFaculty } from './faculty.interface'
import { academicFacultyFiltrableFields } from './faculty.constant'
import { FacultyModel } from './faculty.model'
import { SortOrder } from 'mongoose'

const getAllFaculty = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPagination,
): Promise<IGenericResponse<IFaculty[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters

    const andCondition = []
    if (searchTerm) {
      andCondition.push({
        $or: academicFacultyFiltrableFields.map(field => ({
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

    const result = await FacultyModel.find(whereCondition)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .exec()

    const total = await FacultyModel.countDocuments(whereCondition)

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  } catch (error) {
    console.error('Error fetching faculty:', error)
    throw new Error('Failed to fetch faculty')
  }
}

const getSingleFaculty = async (id: string) => {
  const faculty = await FacultyModel.findById(id)
  if (faculty) {
    return faculty
  }
}

const deleteFaculty = async (id: string) => {
  const faculty = await FacultyModel.findByIdAndDelete(id)
  if (faculty) {
    return faculty
  }
}

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty> => {
  const isExist = await FacultyModel.findById(id)

  if (isExist) {
    const { name, ...facultyData } = payload
    const updatedFacultyData: Partial<IFaculty> = { ...facultyData }

    // dynamically handling
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}` as keyof Partial<IFaculty>
        ;(updatedFacultyData as any)[nameKey] = name[key as keyof typeof name]
      })
    }

    const faculty = await FacultyModel.findByIdAndUpdate(
      { _id: id },
      updatedFacultyData,
      { new: true },
    )
    if (faculty) {
      return faculty
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Internal Server Error!')
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'faculty not found')
  }
}

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
}
