import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { NotFoundException } from '@common/exceptions/not-found.exception'
import { Users } from '@src/models/users'
import * as bcrypt from 'bcrypt'

export const changeUserPassword = async (id: string, currentPassword: string, newPassword: string) => {
  const user = await Users.findOne({ _id: id }).exec()
  if (!user) throw new NotFoundException('User not found')

  const isPasswordMatch = await bcrypt.compare(currentPassword, user.password)

  if (!isPasswordMatch) {
    throw new BadRequestException('Password not match')
  }

  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(newPassword, salt)
  await Users.updateOne({ _id: id }, { password: hashedPassword }).exec()
}
