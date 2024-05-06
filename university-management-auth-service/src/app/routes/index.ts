import express from 'express'
import usersRouter from '../modules/users/users.route'
import academicSemesterRouter from '../modules/academicSemester/academicSemester.route'
import academicFacultyRouter from '../modules/academicFaculty/academicFaculty.route'
import academicDepartmentRouter from '../modules/academicDepartment/academicDepartment.route'
import { StudentRoutes } from '../modules/student/student.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: usersRouter,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRouter,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
