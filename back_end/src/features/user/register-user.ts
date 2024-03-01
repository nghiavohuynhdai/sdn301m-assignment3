import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { Users } from '@src/models/users'
import * as bcrypt from 'bcrypt'
import { loginUser } from './login-user'

export const registerUser = async (name: string, yob: number, username: string, password: string) => {
  const user = await Users.findOne({ username }).exec()
  if (user) {
    throw new BadRequestException('Username already used')
  }
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  await Users.create({ name, yob, username, password: hashedPassword })
}
