import { User } from './user.model'

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(0, '5')
  const incrementId = (parseInt(currentId) + 1).toString().padStart(0, '5')
  return incrementId
}
