import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'

import { IAccountsRepository } from '../../repositories/IAccountsRepository'

interface IRequest {
  balance: number
  id: string
}

@injectable()
class CreateAccountUseCase {
  constructor(
    @inject('accountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  async execute({ balance, id }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.accountsRepository.findById(id)

    if (categoryAlreadyExists) {
      throw new AppError('Esta conta já existe!')
    }

    await this.accountsRepository.create({ balance })
  }
}

export { CreateAccountUseCase }
