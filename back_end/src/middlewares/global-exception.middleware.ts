import { Request, Response, NextFunction } from 'express'
import { ResponseDto } from '@common/dto/response.dto'
import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { NotFoundException } from '@common/exceptions/not-found.exception'
import { ForbiddenRequestException } from '@common/exceptions/forbidden-request.exception'
import { UnauthorizedRequestException } from '@common/exceptions/unauthorized-request.exception'

export default class GlobalExceptionMiddleware {
  public static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500
    let message = 'Internal server error'

    if (err instanceof BadRequestException) {
      statusCode = 400
    }

    if (err instanceof UnauthorizedRequestException) {
      statusCode = 401
    }

    if (err instanceof NotFoundException) {
      statusCode = 404
    }

    if (err instanceof ForbiddenRequestException) {
      statusCode = 403
    }

    if (statusCode === 500) {
      console.error(err)
    } else {
      message = err.message
    }

    res.statusCode = statusCode

    res.json(new ResponseDto(statusCode, message))

    next()
  }
}
