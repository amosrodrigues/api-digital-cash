import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutheticated'
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController'
import { GetUserController } from '../modules/accounts/useCases/getUser/GetUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserController = new GetUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/me', ensureAuthenticated, getUserController.handle)

export { usersRoutes }
