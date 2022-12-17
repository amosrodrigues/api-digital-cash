"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../errors/AppError");
const UsersRepository_1 = require("../modules/accounts/repositories/implementations/UsersRepository");
async function ensureAuthenticated(request, _response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.AppError('Token inexistente ou inválido!', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_PASS);
        const usersRepository = new UsersRepository_1.UsersRepository();
        const user = await usersRepository.findById(user_id);
        if (!user) {
            throw new AppError_1.AppError('Usuário não existe!', 401);
        }
        request.user = {
            id: user_id,
        };
        next();
    }
    catch {
        throw new AppError_1.AppError('Invalid token', 401);
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
