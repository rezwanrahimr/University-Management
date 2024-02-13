import express from 'express'
import usersRouter from '../modules/users/users.route'
import academicSemesterRouter from '../modules/academicSemester/academicSemester.route'

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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
