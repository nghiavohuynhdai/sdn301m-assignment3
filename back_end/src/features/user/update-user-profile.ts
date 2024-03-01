import { NotFoundException } from '@common/exceptions/not-found.exception'
import { Users } from '@src/models/users'

export const updateUserProfile = async (id: string, name: string, yob: number) => {
  const user = await Users.findOne({ _id: id }).exec()
  if (!user) throw new NotFoundException('User not found')

  await Users.updateOne({ _id: user._id }, { name, yob }).exec()
}
