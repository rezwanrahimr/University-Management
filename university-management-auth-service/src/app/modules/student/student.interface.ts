type guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}

type localGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type IStudent = {
  id: string
  name: object
  gender: string
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  bloodGroup?: string
  guardian: guardian
  localGuardian: localGuardian
  profileImage?: string
  academicDepartment?: object
  academicSemester?: object
  academicFaculty?: object
}
