import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token inexistente!', 401)
  }
  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      '8f3aed998ead02d890cc4c5cd15fad95',
    ) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Usuário não existe!', 401)
    }

    request.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
