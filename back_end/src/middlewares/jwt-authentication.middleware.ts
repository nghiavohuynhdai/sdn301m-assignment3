import { UnauthorizedRequestException } from '@common/exceptions/unauthorized-request.exception'
import { RequestHandler } from 'express'
import passport, { AuthenticateCallback } from 'passport'

export const jwtAuthenticationMiddleware: RequestHandler = (req, res, next) => {
  const authenticateCallback: AuthenticateCallback = (err, user) => {
    if (err) {
      console.log(err)
      throw new UnauthorizedRequestException()
    }

    if (!user) {
      throw new UnauthorizedRequestException()
    }

    req.user = user
    next()
  }

  passport.authenticate('jwt', { session: false }, authenticateCallback)(req, res, next)
}
