"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateAccountUseCase_1 = require("./CreateAccountUseCase");
class CreateAccountController {
    async handle(request, response) {
        const { balance, id } = request.body;
        const createAccountUseCase = tsyringe_1.container.resolve(CreateAccountUseCase_1.CreateAccountUseCase);
        await createAccountUseCase.execute({ balance, id });
        return response.status(201).send();
    }
}
exports.CreateAccountController = CreateAccountController;
