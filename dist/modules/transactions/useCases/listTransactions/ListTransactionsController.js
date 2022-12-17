"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTransactionsController = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../errors/AppError");
const ListTransactionsUseCase_1 = require("./ListTransactionsUseCase");
class ListTransactionsController {
    async handle(request, response) {
        const { id: userId } = request.user;
        const { startDate, endDate, type } = request.body;
        const listtransactionsUseCase = tsyringe_1.container.resolve(ListTransactionsUseCase_1.ListTransactionsUseCase);
        const transactions = await listtransactionsUseCase.execute({
            userId,
            startDate,
            endDate,
            type,
        });
        if (!transactions) {
            throw new AppError_1.AppError('Erro ao consultar informações no banco de dados!', 400);
        }
        return response.json(transactions);
    }
}
exports.ListTransactionsController = ListTransactionsController;
