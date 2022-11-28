import { IUserDTO } from '../../accounts/dtos/IUserDTO'
import { Transaction } from '../entities/Transactions'

interface ICreateTransactionDTO {
  value: number
  debitedAccountId?: string
  creditedAccountId?: string
}

export interface ITransactionsList {
  credited?: Transaction[]
  debited?: Transaction[]
}

interface ITrasactionsRepository {
  create({
    value,
    creditedAccountId,
    debitedAccountId,
  }: ICreateTransactionDTO): Promise<void>
  findById(id: string): Promise<Transaction>
  getUserBalance(username: string): Promise<IUserDTO>
  updateBalance({
    value,
    creditedAccountId,
    debitedAccountId,
  }: ICreateTransactionDTO): Promise<void>
  list({ userId, startDate, endDate }): Promise<ITransactionsList>
}

export { ITrasactionsRepository, ICreateTransactionDTO }
