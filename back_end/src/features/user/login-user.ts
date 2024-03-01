import { AccessTokenPayload, jwtExpiration, jwtSecret } from '@configs/auth/auth.config'
import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { Users } from '@src/models/users'
import * as bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

export const loginUser = async (username: string, password: string) => {
  const user = await Users.findOne({ username }).exec()
  if (!user) {
    throw new BadRequestException('Invalid username or password')
  }
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    throw new BadRequestException('Invalid username or password')
  }

  const accessTokenPayload: AccessTokenPayload = {
    name: user.name,
    sub: user._id.toString(),
    isAdmin: user.isAdmin
  }
  return {
    accessToken: sign(accessTokenPayload, jwtSecret, {
      expiresIn: jwtExpiration / 1000
    })
  }
}
