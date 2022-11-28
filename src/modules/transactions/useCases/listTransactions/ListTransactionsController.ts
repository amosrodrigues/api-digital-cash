import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { ListTransactionsUseCase } from './ListTransactionsUseCase'

class ListTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user
    const { startDate, endDate, type } = request.body

    const listtransactionsUseCase = container.resolve(ListTransactionsUseCase)

    const transactions = await listtransactionsUseCase.execute({
      userId,
      startDate,
      endDate,
      type,
    })

    if (!transactions) {
      throw new AppError(
        'Erro ao consultar informações no banco de dados!',
        400,
      )
    }

    return response.json(transactions)
  }
}

export { ListTransactionsController }
