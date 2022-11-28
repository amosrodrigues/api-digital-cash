import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutheticated'

import { CreateAccountController } from '../modules/accounts/useCases/createAccount/CreateAccountController'

const accountsRoutes = Router()

const createCategoryController = new CreateAccountController()

accountsRoutes.post('/', ensureAuthenticated, createCategoryController.handle)
accountsRoutes.get('/', ensureAuthenticated, createCategoryController.handle)

export { accountsRoutes }
