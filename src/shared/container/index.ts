import { container } from 'tsyringe'

import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'

import { TransactionsRepository } from '../../modules/transactions/repositories/implementations/TransactionsRepository'
import { ITrasactionsRepository } from '../../modules/transactions/repositories/ITransactionsRepository'

import { AccountsRepository } from '../../modules/accounts/repositories/implementations/AccountsRepository'
import { IAccountsRepository } from '../../modules/accounts/repositories/IAccountsRepository'

container.registerSingleton<ITrasactionsRepository>(
  'transactionsRepository',
  TransactionsRepository,
)

container.registerSingleton<IAccountsRepository>(
  'accountsRepository',
  AccountsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
