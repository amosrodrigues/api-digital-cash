import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTransactionUseCase } from './CreateTransactionUseCase'

class CreateTransactioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { value, creditedAccountId, debitedAccountId } = request.body

    const createTrasactionUseCase = container.resolve(CreateTransactionUseCase)

    const dataAccountsTransaction = await createTrasactionUseCase.validate({
      value,
      creditedAccountId,
      debitedAccountId,
    })

    await createTrasactionUseCase.execute({
      value,
      creditedAccountId: dataAccountsTransaction.creditedAccountId,
      debitedAccountId: dataAccountsTransaction.debitedAccountId,
    })

    return response.status(201).send()
  }
}

export { CreateTransactioController }
