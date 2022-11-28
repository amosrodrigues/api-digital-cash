import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO'
import { Account } from '../entities/Account'

interface IAccountsRepository {
  findById(name: string): Promise<Account>
  list(): Promise<Account[]>
  create({ balance }: ICreateAccountDTO): Promise<void>
}

export { IAccountsRepository }
