export type IFaculty = {
  id: string
  name: object
  dateOfBirth: string
  contactNo: string
  emergencyContactNo: string
  gender: string
  permanentAddress: string
  presentAddress: string
  bloodGroup: string
  designation: string
  academicDepartment?: object
  academicFaculty?: object
  profileImage: string
}
export type IAcademicFacultyFilters = {
  searchTerm?: string
}
