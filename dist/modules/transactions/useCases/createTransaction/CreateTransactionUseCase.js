"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../errors/AppError");
let CreateTransactionUseCase = class CreateTransactionUseCase {
    transactionsRepository;
    constructor(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    async validate({ value, creditedAccountId, debitedAccountId, }) {
        const dataAccountCredited = await this.transactionsRepository.getUserBalance(creditedAccountId);
        const dataAccountDebited = await this.transactionsRepository.getUserBalance(debitedAccountId);
        if (debitedAccountId === creditedAccountId) {
            throw new AppError_1.AppError('Não é possível tranferir para mesma titularidade!', 403);
        }
        if (!dataAccountCredited) {
            throw new AppError_1.AppError('Conta do destinatário inexistente!', 404);
        }
        if (dataAccountDebited?.account?.balance < value) {
            throw new AppError_1.AppError('Saldo insuficiente!', 400);
        }
        const dataAccountsTransaction = {
            creditedAccountId: dataAccountCredited.account.id,
            debitedAccountId: dataAccountDebited.account.id,
        };
        return dataAccountsTransaction;
    }
    async execute({ value, creditedAccountId, debitedAccountId, }) {
        await this.transactionsRepository.create({
            value,
            creditedAccountId,
            debitedAccountId,
        });
    }
};
CreateTransactionUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('transactionsRepository')),
    __metadata("design:paramtypes", [Object])
], CreateTransactionUseCase);
exports.CreateTransactionUseCase = CreateTransactionUseCase;
