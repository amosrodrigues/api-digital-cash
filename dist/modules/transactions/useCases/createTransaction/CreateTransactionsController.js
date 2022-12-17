"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactioController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateTransactionUseCase_1 = require("./CreateTransactionUseCase");
class CreateTransactioController {
    async handle(request, response) {
        const { value, creditedAccountId, debitedAccountId } = request.body;
        const createTrasactionUseCase = tsyringe_1.container.resolve(CreateTransactionUseCase_1.CreateTransactionUseCase);
        const dataAccountsTransaction = await createTrasactionUseCase.validate({
            value,
            creditedAccountId,
            debitedAccountId,
        });
        await createTrasactionUseCase.execute({
            value,
            creditedAccountId: dataAccountsTransaction.creditedAccountId,
            debitedAccountId: dataAccountsTransaction.debitedAccountId,
        });
        return response.status(201).send();
    }
}
exports.CreateTransactioController = CreateTransactioController;
