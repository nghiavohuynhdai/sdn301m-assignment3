import { isValidObjectId } from 'mongoose'
import { ResponseDto } from '@common/dto/response.dto'
import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { loginUser } from '@src/features/user/login-user'
import { RequestHandler, Router } from 'express'
import { registerUser } from '@src/features/user/register-user'
import { jwtExpiration } from '@configs/auth/auth.config'
import { getUserProfile } from '@src/features/user/get-user-profile'
import passport from 'passport'
import { updateUserProfile } from '@src/features/user/update-user-profile'
import { changeUserPassword } from '@src/features/user/change-user-password'
import { adminAuthorizationMiddleware } from '@middlewares/admin-authorization.middleware'

const getUserProfileHandler: RequestHandler = async (req, res, next) => {
  const expressUser = req.user as {
    _id: string
    name: string
    isAdmin: boolean
  }

  try {
    const user = await getUserProfile(expressUser._id)
    if (!user) {
      throw new BadRequestException('User not found')
    }

    res.json(new ResponseDto(200, '', user))
  } catch (error) {
    next(error)
  }
}

const loginValidator: RequestHandler = (req, res, next) => {
  const body: { username?: string; password?: string } = req.body

  if (!body.username) {
    throw new BadRequestException('username is required')
  }

  if (!body.password) {
    throw new BadRequestException('password is required')
  }

  next()
}

const loginHandler: RequestHandler = async (req, res, next) => {
  const body: { username: string; password: string } = req.body

  try {
    const loginResult = await loginUser(body.username, body.password)
    res.cookie('jwt', loginResult.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + jwtExpiration)
    })
    res.json(new ResponseDto(200, '', { success: true }))
  } catch (error) {
    next(error)
  }
}

const logoutUserHandler: RequestHandler = (req, res, next) => {
  res.clearCookie('jwt')
  res.json(new ResponseDto(200, '', { success: true }))
}

const registerValidator: RequestHandler = (req, res, next) => {
  const body: {
    name?: string
    yob?: number
    username?: string
    password?: string
  } = req.body

  if (!body.name) {
    throw new BadRequestException('name is required')
  }

  if (!body.yob) {
    throw new BadRequestException('yob is required')
  }

  if (!body.username) {
    throw new BadRequestException('username is required')
  }

  if (!body.password) {
    throw new BadRequestException('password is required')
  }

  next()
}

const registerHandler: RequestHandler = async (req, res, next) => {
  const body: {
    name: string
    yob: number
    username: string
    password: string
  } = req.body

  try {
    await registerUser(body.name, body.yob, body.username, body.password)
    res.json(new ResponseDto(200, '', { success: true }))
  } catch (error) {
    next(error)
  }
}

const updateUserValidator: RequestHandler = (req, res, next) => {
  const body: { name?: string; yob?: number } = req.body

  if (!body.name) {
    throw new BadRequestException('name is required')
  }

  if (!body.yob) {
    throw new BadRequestException('yob is required')
  }

  next()
}

const updateUserHandler: RequestHandler = async (req, res, next) => {
  const expressUser = req.user as {
    _id: string
    name: string
    isAdmin: boolean
  }

  const body: { name: string; yob: number } = req.body

  try {
    await updateUserProfile(expressUser._id, body.name, body.yob)

    res.json(new ResponseDto(200, '', { success: true }))
  } catch (error) {
    next(error)
  }
}

const changeUserPasswordValidator: RequestHandler = (req, res, next) => {
  const body: { currentPassword?: string; newPassword?: string } = req.body

  if (!body.currentPassword) {
    throw new BadRequestException('oldPassword is required')
  }

  if (!body.newPassword) {
    throw new BadRequestException('newPassword is required')
  }

  next()
}

const changeUserPasswordHandler: RequestHandler = async (req, res, next) => {
  const expressUser = req.user as {
    _id: string
    name: string
    isAdmin: boolean
  }

  const body: { currentPassword: string; newPassword: string } = req.body

  try {
    await changeUserPassword(expressUser._id, body.currentPassword, body.newPassword)

    res.json(new ResponseDto(200, '', { success: true }))
  } catch (error) {
    next(error)
  }
}

const userRouter = Router()

userRouter.get('/profile', passport.authenticate('jwt', { session: false }), getUserProfileHandler)

userRouter.post('/login', loginValidator, loginHandler)

userRouter.post('/logout', passport.authenticate('jwt', { session: false }), logoutUserHandler)

userRouter.post('/register', registerValidator, registerHandler)

userRouter.put('/profile', passport.authenticate('jwt', { session: false }), updateUserValidator, updateUserHandler)

userRouter.put(
  '/password',
  passport.authenticate('jwt', { session: false }),
  changeUserPasswordValidator,
  changeUserPasswordHandler
)

export { userRouter }
