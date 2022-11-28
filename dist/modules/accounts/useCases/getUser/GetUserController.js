"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserController = void 0;
const tsyringe_1 = require("tsyringe");
const GetUserUseCase_1 = require("./GetUserUseCase");
class GetUserController {
    async handle(request, response) {
        const { id } = request.user;
        const getUserUseCase = tsyringe_1.container.resolve(GetUserUseCase_1.GetUserUseCase);
        const user = await getUserUseCase.execute({
            id,
        });
        return response.status(201).json({ user });
    }
}
exports.GetUserController = GetUserController;
