import { Model } from 'mongoose'
export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall'
export type IAcademicSemesterCode = '01' | '02' | '03'
export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
export type IAcademicSemester = {
  title: IAcademicSemesterTitle
  year: string
  code: IAcademicSemesterCode
  startMonth: IAcademicSemesterMonths
  endMonth: IAcademicSemesterMonths
}

export type AcademicSemesterModel = Model<IAcademicSemester>

export type IAcademicSemesterFilters = {
  searchTerm?: string
}
