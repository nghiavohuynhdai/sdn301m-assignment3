import { Request } from 'express'
import { StrategyOptions, Strategy } from 'passport-jwt'
import passport from 'passport'
import { Users } from '@src/models/users'

const jwtSecret = process.env.JWT_SECRET || 'secret'
const jwtExpiration = Number.parseInt(process.env.JWT_EXPIRATION || '3600000')

const cookieExtractor = (req: Request) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['jwt']
  }
  return token
}

const opts: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  ignoreExpiration: false,
  secretOrKey: jwtSecret
}

passport.use(
  new Strategy(opts, async (payload: AccessTokenPayload, done) => {
    try {
      const user = await Users.findById(payload.sub)
      if (!user) {
        done(null, null)
      }
    } catch (error) {
      done(error, null)
    }

    done(null, {
      _id: payload.sub,
      name: payload.name,
      isAdmin: payload.isAdmin
    })
  })
)

interface AccessTokenPayload {
  name: string
  sub: string
  isAdmin: boolean
  iat?: number
  exp?: number
}

export { passport, jwtSecret, jwtExpiration }
export type { AccessTokenPayload }
