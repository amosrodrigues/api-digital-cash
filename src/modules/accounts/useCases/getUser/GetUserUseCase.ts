import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUserDTO } from '../../dtos/IUserDTO'

import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class GetUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ id }: Partial<ICreateUserDTO>): Promise<IUserDTO> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError('Usuário não existe!')
    }

    return user
  }
}

export { GetUserUseCase }
