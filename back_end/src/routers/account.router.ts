import { ResponseDto } from '@common/dto/response.dto'
import { adminAuthorizationMiddleware } from '@middlewares/admin-authorization.middleware'
import { getAllUsers } from '@src/features/user/get-all-user'
import { RequestHandler, Router } from 'express'
import passport from 'passport'

const getAllAccountsHandler: RequestHandler = async (req, res, next) => {
  const users = await getAllUsers()
  res.json(new ResponseDto(200, '', users))
}

const accountRouter = Router()

accountRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminAuthorizationMiddleware,
  getAllAccountsHandler
)

export { accountRouter }
