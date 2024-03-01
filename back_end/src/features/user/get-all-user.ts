import { Users } from '@src/models/users'

export const getAllUsers = async () => {
  return await Users.find().lean().exec()
}
