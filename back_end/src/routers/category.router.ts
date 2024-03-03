import { Router, RequestHandler } from 'express'
import { isValidObjectId } from 'mongoose'
import { ResponseDto } from '@common/dto/response.dto'
import { getAllCategories } from '@src/features/category/get-all-categories'
import { BadRequestException } from '@common/exceptions/bad-request.exception'
import { getCategoryById } from '@src/features/category/get-category-by-id'
import { NotFoundException } from '@common/exceptions/not-found.exception'
import { createCategory } from '@src/features/category/create-category'
import { updateCategory } from '@src/features/category/update-category'
import { deleteCategory } from '@src/features/category/delete-category'
import { roleBasedAuthorizationMiddleware } from '@middlewares/role-based-authorization.middleware'
import { Role } from '@common/constants/role.constants'
import { jwtAuthenticationMiddleware } from '@middlewares/jwt-authentication.middleware'

const getAllCategoriesHandler: RequestHandler = async (_, res) => {
  const categories = await getAllCategories()

  res.json(new ResponseDto(200, '', categories))
}

const getCategoryByIdValidator: RequestHandler = ({ params }, res, next) => {
  if (isValidObjectId(params.id) === false) {
    throw new BadRequestException('Invalid category id')
  }

  next()
}

const getCategoryByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id)

    if (category === null) {
      throw new NotFoundException('Category not found')
    }

    res.json(new ResponseDto(200, '', category))
  } catch (error) {
    next(error)
  }
}

const createCategoryValidator: RequestHandler = (req, res, next) => {
  const body: { name?: string } = req.body
  if (!body.name) {
    throw new BadRequestException('Category name is required')
  }

  next()
}

const createCategoryHandler: RequestHandler = async (req, res, next) => {
  const body: { name: string } = req.body

  try {
    await createCategory(body.name)

    res.statusCode = 201
    res.json(new ResponseDto(201, 'Category created'))
  } catch (error) {
    next(error)
  }
}

const updateCategoryValidator: RequestHandler = (req, res, next) => {
  const params = req.params
  const body: { id?: string; name?: string } = req.body

  if (!params.id) {
    throw new BadRequestException('Category id is required')
  }

  if (isValidObjectId(params.id) === false) {
    throw new BadRequestException('Invalid category id')
  }

  if (!body.name) {
    throw new BadRequestException('Category name is required')
  }

  next()
}

const updateCategoryHandler: RequestHandler = async (req, res, next) => {
  const params = req.params
  const body: { name: string } = req.body

  try {
    await updateCategory(params.id, body.name)

    res.statusCode = 200
    res.json(new ResponseDto(200, 'Category updated'))
  } catch (error) {
    next(error)
  }
}

const deleteCategoryValidator: RequestHandler = (req, res, next) => {
  if (isValidObjectId(req.params.id) === false) {
    throw new BadRequestException('Invalid category id')
  }

  next()
}

const deleteCategoryHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteCategory(req.params.id)

    res.statusCode = 200
    res.json(new ResponseDto(200, 'Category deleted'))
  } catch (error) {
    next(error)
  }
}

const categoryRouter = Router()

categoryRouter.get(
  '/',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.ADMIN]),
  getAllCategoriesHandler
)

categoryRouter.get(
  '/:id',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.ADMIN]),
  getCategoryByIdValidator,
  getCategoryByIdHandler
)

categoryRouter.post(
  '/',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.ADMIN]),
  createCategoryValidator,
  createCategoryHandler
)

categoryRouter.put(
  '/:id',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.ADMIN]),
  updateCategoryValidator,
  updateCategoryHandler
)

categoryRouter.delete(
  '/:id',
  jwtAuthenticationMiddleware,
  roleBasedAuthorizationMiddleware([Role.ADMIN]),
  deleteCategoryValidator,
  deleteCategoryHandler
)

export { categoryRouter }
