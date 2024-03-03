import express from 'express'
import usersRouter from '../modules/users/users.route'
import academicSemesterRouter from '../modules/academicSemester/academicSemester.route'
import academicFacultyRouter from '../modules/academicFaculty/academicFaculty.route'
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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
