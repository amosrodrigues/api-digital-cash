import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAutheticated'
import { CreateTransactioController } from '../modules/transactions/useCases/createTransaction/CreateTransactionsController'
import { ListTransactionsController } from '../modules/transactions/useCases/listTransactions/ListTransactionsController'

const transactionsRoutes = Router()

const createSpecificationController = new CreateTransactioController()
const listTransactionsController = new ListTransactionsController()

transactionsRoutes.post(
  '/create',
  ensureAuthenticated,
  createSpecificationController.handle,
)

transactionsRoutes.post(
  '/list',
  ensureAuthenticated,
  listTransactionsController.handle,
)

export { transactionsRoutes }
