"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateUserUseCase_1 = require("./CreateUserUseCase");
class CreateUserController {
    async handle(request, response) {
        const { username, password } = request.body;
        const createUserUseCase = tsyringe_1.container.resolve(CreateUserUseCase_1.CreateUserUseCase);
        await createUserUseCase.execute({
            username,
            password,
        });
        return response.status(201).send();
    }
}
exports.CreateUserController = CreateUserController;
