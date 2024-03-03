import { createComment } from '@src/features/orchid/comment/create-comment'
import { ResponseDto } from '@common/dto/response.dto'
import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { NotFoundException } from '@common/exceptions/not-found.exception'
import { createOrchid } from '@src/features/orchid/create-orchid'
import { deleteOrchid } from '@src/features/orchid/delete-orchid'
import { getAllOrchids } from '@src/features/orchid/get-all-orchids'
import { getOrchidBySlug } from '@src/features/orchid/get-orchid-by-slug'
import { updateOrchid } from '@src/features/orchid/update-orchid'
import { Router, RequestHandler } from 'express'
import { isValidObjectId } from 'mongoose'
import { roleBasedAuthorizationMiddleware } from '@middlewares/role-based-authorization.middleware'
import { Role } from '@common/constants/role.constants'
import { jwtAuthenticationMiddleware } from '@middlewares/jwt-authentication.middleware'

const getAllOrchidsHandler: RequestHandler = async (req, res) => {
  const filter = req.query.name ? { name: req.query.name as string } : null
  const orchids = await getAllOrchids(filter)

  res.json(new ResponseDto(200, '', orchids))
}

const getOrchidBySlugHandler: RequestHandler = async (req, res, next) => {
  try {
    const orchid = await getOrchidBySlug(req.params.slug)

    if (orchid === null) {
      throw new NotFoundException('Orchid not found')
    }

    res.json(new ResponseDto(200, '', orchid))
  } catch (error) {
    next(error)
  }
}

const createOrchidValidator: RequestHandler = (req, res, next) => {
  const body: {
    name?: string
    image?: string
    isNatural?: boolean
    origin?: string
    categoryId?: string
  } = req.body

  if (!body.name) {
    throw new BadRequestException('orchid name is required')
  }

  if (!body.image) {
    throw new BadRequestException('orchid description is required')
  }

  if (body.isNatural == null || body.isNatural == undefined) {
    throw new BadRequestException('orchid isNatural is required')
  }

  if (!body.origin) {
    throw new BadRequestException('orchid origin is required')
  }

  if (!body.categoryId) {
    throw new BadRequestException('orchid category is required')
  }

  if (isValidObjectId(body.categoryId) === false) {
    throw new BadRequestException('Invalid category id')
  }

  next()
}

const createOrchidHandler: RequestHandler = async (req, res, next) => {
  const body: {
    name: string
    image: string
    isNatural: boolean
    origin: string
    categoryId: string
  } = req.body

  try {
    await createOrchid(body.name, body.image, body.isNatural, body.origin, body.categoryId)

    res.statusCode = 201
    res.json(new ResponseDto(201, 'orchid created'))
  } catch (error) {
    next(error)
  }
}

const updateOrchidValidator: RequestHandler = (req, res, next) => {
  const body: {
    name?: string
    image?: string
    isNatural?: boolean
    origin?: string
    categoryId?: string
  } = req.body

  if (!body.name) {
    throw new BadRequestException('orchid name is required')
  }

  if (!body.image) {
    throw new BadRequestException('orchid description is required')
  }

  if (!body.origin) {
    throw new BadRequestException('orchid origin is required')
  }

  if (body.isNatural == null || body.isNatural == undefined) {
    throw new BadRequestException('orchid isNatural is required')
  }

  if (!body.categoryId) {
    throw new BadRequestException('orchid category is required')
  }

  if (isValidObjectId(body.categoryId) === false) {
    throw new BadRequestException('Invalid category id')
  }

  next()
}

const updateOrchidHandler: RequestHandler = async (req, res, next) => {
  const body: {
    name: string
    image: string
    isNatural: boolean
    origin: string
    categoryId: string
  } = req.body

  try {
    await updateOrchid(body.name, body.image, body.isNatural, body.origin, body.categoryId, req.params.slug)

    res.statusCode = 200
    res.json(new ResponseDto(200, 'orchid updated'))
  } catch (error) {
    next(error)
  }
}

const deleteOrchidHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteOrchid(req.params.slug)

    res.statusCode = 200
    res.json(new ResponseDto(200, 'Orchid deleted'))
  } catch (error) {
    next(error)
  }
}

const createCommentValidator: RequestHandler = (req, res, next) => {
  const body: { rating?: number; comment?: string } = req.body

  if (!body.rating) {
    throw new BadRequestException('rating is required')
  }

  if (body.rating < 1 || body.rating > 5) {
    throw new BadRequestException('rating must be between 1 and 5')
  }

  if (!body.comment) {
    throw new BadRequestException('comment is required')
  }

  next()
}

const createCommentHandler: RequestHandler = async (req, res, next) => {
  const expressUser = req.user as {
    _id: string
    name: string
    isAdmin: boolean
  }

  const body: { rating: number; comment: string } = req.body

  try {
    await createComment(req.params.slug, body.rating, body.comment, expressUser._id)

    res.statusCode = 201
    res.json(new ResponseDto(201, 'posted comment'))
  } catch (error) {
    next(error)
  }
}

const orchidRouter = Router()

orchidRouter.get('/', getAllOrchidsHandler)

orchidRouter.get('/:slug', getOrchidBySlugHandler)

orchidRouter.post(
  '/',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.ADMIN]),
  createOrchidValidator,
  createOrchidHandler
)

orchidRouter.put(
  '/:slug',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.ADMIN]),
  updateOrchidValidator,
  updateOrchidHandler
)

orchidRouter.delete(
  '/:slug',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.ADMIN]),
  deleteOrchidHandler
)

orchidRouter.post(
  '/:slug/comments',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.MEMBER]),
  createCommentValidator,
  createCommentHandler
)

export { orchidRouter }
