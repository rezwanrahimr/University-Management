export type IAdmin = {
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
  managementDepartment: object
  profileImage: string
}
export type IAdminFilters = {
  searchTerm?: string
}
