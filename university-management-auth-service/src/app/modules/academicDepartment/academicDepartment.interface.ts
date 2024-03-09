import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type IAcademicDepartment = {
  title: string
  academicFaculty: string | IAcademicFaculty
}
export type IAcademicDepartmentFilters = {
  searchTerm?: string
}
