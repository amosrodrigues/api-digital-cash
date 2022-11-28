import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { IUserDTO } from '../../../accounts/dtos/IUserDTO'

import {
  ICreateTransactionDTO,
  ITrasactionsRepository,
} from '../../repositories/ITransactionsRepository'

interface IRequest {
  value: number
  debitedAccountId?: string
  creditedAccountId?: string
}

interface IAccountsTransactionResponse {
  creditedAccountId: string
  debitedAccountId: string
}

@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject('transactionsRepository')
    private transactionsRepository: ITrasactionsRepository,
  ) {}

  async validate({
    value,
    creditedAccountId,
    debitedAccountId,
  }: IRequest): Promise<IAccountsTransactionResponse> {
    const dataAccountCredited: IUserDTO =
      await this.transactionsRepository.getUserBalance(creditedAccountId)

    const dataAccountDebited: IUserDTO =
      await this.transactionsRepository.getUserBalance(debitedAccountId)

    if (debitedAccountId === creditedAccountId) {
      throw new AppError(
        'Não é possível tranferir para mesma titularidade!',
        403,
      )
    }

    if (!dataAccountCredited) {
      throw new AppError('Conta do destinatário inexistente!', 404)
    }

    if (dataAccountDebited?.account?.balance < value) {
      throw new AppError('Saldo insuficiente!', 400)
    }

    const dataAccountsTransaction = {
      creditedAccountId: dataAccountCredited.account.id,
      debitedAccountId: dataAccountDebited.account.id,
    }

    return dataAccountsTransaction
  }

  async execute({
    value,
    creditedAccountId,
    debitedAccountId,
  }: ICreateTransactionDTO): Promise<void> {
    await this.transactionsRepository.create({
      value,
      creditedAccountId,
      debitedAccountId,
    })
  }
}

export { CreateTransactionUseCase }
