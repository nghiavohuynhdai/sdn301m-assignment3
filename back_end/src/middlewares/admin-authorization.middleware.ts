import { ForbiddenRequestException } from '@common/exceptions/forbidden-request.exception'
import { RequestHandler } from 'express'

export const adminAuthorizationMiddleware: RequestHandler = (req, res, next) => {
  const expressUser = req.user as {
    _id: string
    name: string
    isAdmin: boolean
  }

  if (!expressUser.isAdmin) {
    throw new ForbiddenRequestException('You are not authorized to perform this action')
  }

  next()
}
