import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateAccountUseCase } from './CreateAccountUseCase'

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { balance, id } = request.body
    const createAccountUseCase = container.resolve(CreateAccountUseCase)

    await createAccountUseCase.execute({ balance, id })

    return response.status(201).send()
  }
}

export { CreateAccountController }
