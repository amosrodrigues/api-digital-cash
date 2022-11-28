import { AppDataSource } from '../../../../database'

import { Account } from '../../entities/Account'

import { IAccountsRepository } from '../IAccountsRepository'

import { Repository } from 'typeorm'
import { ICreateAccountDTO } from '../../dtos/ICreateAccountDTO'

class AccountsRepository implements IAccountsRepository {
  private repository: Repository<Account>

  constructor() {
    this.repository = AppDataSource.getRepository(Account)
  }

  async create({ balance }: ICreateAccountDTO): Promise<void> {
    const account = this.repository.create({
      balance,
    })

    await this.repository.save(account)
  }

  async list(): Promise<Account[]> {
    const accounts = await this.repository.find()
    return accounts
  }

  async findById(id: string): Promise<Account> {
    const account = await this.repository.findOne({ where: { id } })

    return account
  }
}

export { AccountsRepository }
