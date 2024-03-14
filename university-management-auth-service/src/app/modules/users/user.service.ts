import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const academicSemester = {
    code: '01',
    year: '2025',
  }
  //auto generate increment id
  const id = await generateStudentId(academicSemester)
  user.id = id

  // set default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createUser = await User.create(user)
  if (!createUser) {
    throw new Error('Fail to create user')
  }
  return createUser
}

export const UserService = { createUser }
