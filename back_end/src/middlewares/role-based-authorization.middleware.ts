import { Role } from '@common/constants/role.constants'
import { ForbiddenRequestException } from '@common/exceptions/forbidden-request.exception'
import { RequestHandler } from 'express'

export const roleBasedAuthorizationMiddleware = (roles: Role[]) => {
  const middleware: RequestHandler = (req, _, next) => {
    const expressUser = req.user as {
      _id: string
      name: string
      isAdmin: boolean
    }

    if (roles.includes(Role.ADMIN) && !roles.includes(Role.MEMBER)) {
      if (!expressUser.isAdmin) {
        throw new ForbiddenRequestException('You are not authorized to perform this action')
      }
      next()
      return
    }

    if (!roles.includes(Role.ADMIN) && roles.includes(Role.MEMBER)) {
      if (expressUser.isAdmin) {
        throw new ForbiddenRequestException('You are not authorized to perform this action')
      }
      next()
      return
    }

    if (!roles.includes(Role.ADMIN) && !roles.includes(Role.MEMBER)) {
      throw new ForbiddenRequestException('You are not authorized to perform this action')
    }

    next()
  }
  return middleware
}
