import { Router } from 'express'
import { authenticateRoutes } from './authenticate.routes'
import { transactionsRoutes } from './transactions.routes'
import { accountsRoutes } from './accounts.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/transactions', transactionsRoutes)
router.use('/accounts', accountsRoutes)
router.use('/users', usersRoutes)
router.use(authenticateRoutes)

export { router }
