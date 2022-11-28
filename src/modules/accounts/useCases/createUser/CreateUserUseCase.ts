import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { hash } from 'bcrypt'

import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute({ username, password }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8)

    const userAlreadyExists = await this.userRepository.findByUserName(username)

    if (userAlreadyExists) {
      throw new AppError('Usuário já existe!', 400)
    }

    await this.userRepository.create({
      username,
      password: passwordHash,
    })
  }
}

export { CreateUserUseCase }
