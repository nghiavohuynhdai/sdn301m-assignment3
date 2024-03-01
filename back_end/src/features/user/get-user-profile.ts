import { Users } from '@src/models/users'

export const getUserProfile = async (userId: string) => {
  const user = await Users.findById(userId).lean().exec()
  return user
}
