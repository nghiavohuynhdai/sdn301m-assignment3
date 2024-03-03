import { Role } from '@common/constants/role.constants'
import { ResponseDto } from '@common/dto/response.dto'
import { jwtAuthenticationMiddleware } from '@middlewares/jwt-authentication.middleware'
import { roleBasedAuthorizationMiddleware } from '@middlewares/role-based-authorization.middleware'
import { getAllUsers } from '@src/features/user/get-all-user'
import { RequestHandler, Router } from 'express'

const getAllAccountsHandler: RequestHandler = async (req, res, next) => {
  const users = await getAllUsers()
  res.json(new ResponseDto(200, '', users))
}

const accountRouter = Router()

accountRouter.get(
  '/',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.ADMIN]),
  getAllAccountsHandler
)

export { accountRouter }
