import { ResponseDto } from '@common/dto/response.dto'
import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { NotFoundException } from '@common/exceptions/not-found.exception'
import { adminAuthorizationMiddleware } from '@middlewares/admin-authorization.middleware'
import { createOrchid } from '@src/features/orchid/create-orchid'
import { deleteOrchid } from '@src/features/orchid/delete-orchid'
import { getAllOrchids } from '@src/features/orchid/get-all-orchids'
import { getOrchidBySlug } from '@src/features/orchid/get-orchid-by-slug'
import { updateOrchid } from '@src/features/orchid/update-orchid'
import { Router, RequestHandler } from 'express'
import { isValidObjectId } from 'mongoose'
import passport from 'passport'

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
    slug?: string
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

  if (!req.params.slug) {
    throw new BadRequestException('orchid slug is required')
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

const orchidRouter = Router()

orchidRouter.get('/', getAllOrchidsHandler)

orchidRouter.get('/:slug', getOrchidBySlugHandler)

orchidRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  adminAuthorizationMiddleware,
  createOrchidValidator,
  createOrchidHandler
)

orchidRouter.put(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  adminAuthorizationMiddleware,
  updateOrchidValidator,
  updateOrchidHandler
)

orchidRouter.delete(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  adminAuthorizationMiddleware,
  deleteOrchidHandler
)

export { orchidRouter }
