import { AppDataSource } from '../../../../database'

import { Between, Repository } from 'typeorm'

import { Transaction } from '../../entities/Transactions'

import {
  ICreateTransactionDTO,
  ITransactionsList,
  ITrasactionsRepository,
} from '../ITransactionsRepository'
import { IUserDTO } from '../../../accounts/dtos/IUserDTO'
import { User } from '../../../accounts/entities/User'
import { Account } from '../../../accounts/entities/Account'

class TransactionsRepository implements ITrasactionsRepository {
  private repository: Repository<Transaction>

  constructor() {
    this.repository = AppDataSource.getRepository(Transaction)
  }

  async getUserBalance(username: string): Promise<IUserDTO> {
    const usersRepository = AppDataSource.manager.getRepository(User)

    const user = await usersRepository.findOne({
      where: {
        username,
      },
      relations: {
        account: true,
      },
    })
    return user
  }

  async updateBalance({
    value,
    creditedAccountId,
    debitedAccountId,
  }: ICreateTransactionDTO): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .update(Account)
      .set({
        balance: () => `balance + ${value}`,
      })
      .where({ id: creditedAccountId })
      .execute()

    await AppDataSource.createQueryBuilder()
      .update(Account)
      .set({
        balance: () => `balance - ${value}`,
      })
      .where({ id: debitedAccountId })
      .execute()
  }

  async create({
    value,
    creditedAccountId,
    debitedAccountId,
  }: ICreateTransactionDTO): Promise<void> {
    await this.updateBalance({
      value,
      creditedAccountId,
      debitedAccountId,
    })

    const transaction = this.repository.create({
      value,
      creditedAccountId,
      debitedAccountId,
    })

    await this.repository.save(transaction)
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.repository.findOne({ where: { id } })

    return transaction
  }

  async list({ userId, startDate, endDate }): Promise<ITransactionsList> {
    const usersRepository = AppDataSource.manager.getRepository(User)
    const user = await usersRepository.findOne({
      where: { id: userId },
      relations: { account: true },
    })
    const accountId = user.account.id

    const firstDate = startDate || new Date('2022-11-01')
    const secondDate = endDate || new Date(Date.now()).toDateString()
    const endDateFormated = new Date(secondDate)
    const lastDate = endDateFormated.setDate(endDateFormated.getDate() + 1)

    const transactionsCredited = await this.repository.find({
      relations: ['account'],
      where: {
        creditedAccountId: accountId,
        createdAt: Between(new Date(firstDate), new Date(lastDate)),
      },
      order: {
        createdAt: 'ASC',
      },
    })

    const transactionsDebited = await this.repository.find({
      relations: ['account'],
      where: {
        debitedAccountId: accountId,
        createdAt: Between(new Date(firstDate), new Date(lastDate)),
      },
      order: {
        createdAt: 'ASC',
      },
    })

    const trasactions = {
      credited: transactionsCredited,
      debited: transactionsDebited,
    }

    return trasactions
  }
}

export { TransactionsRepository }
