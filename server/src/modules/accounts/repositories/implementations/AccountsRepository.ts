import dataSource from '../../../../database/data-source'

import { Account } from '../../entities/Account'

import { ICreateAccountDTO, IAccountsRepository } from '../IAccountsRepository'

import { Repository } from 'typeorm'

class accountsRepository implements IAccountsRepository {
  private repository: Repository<Account>

  constructor() {
    this.repository = dataSource.getRepository(Account)
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

export { accountsRepository }