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
exports.ListTransactionsUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../errors/AppError");
let ListTransactionsUseCase = class ListTransactionsUseCase {
    transactionsRepository;
    constructor(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    async execute({ userId, startDate, endDate, type, }) {
        const transactions = await this.transactionsRepository.list({
            userId,
            startDate,
            endDate,
        });
        if (!transactions) {
            throw new AppError_1.AppError('Não é possível listar as transações!', 400);
        }
        const { credited, debited } = transactions;
        const creditedList = credited.map((transaction) => ({
            id: transaction.id,
            type: 'credited',
            value: transaction.value,
            createdAt: transaction.createdAt,
        }));
        const debitedList = debited.map((transaction) => ({
            id: transaction.id,
            type: 'debited',
            value: transaction.value,
            createdAt: transaction.createdAt,
        }));
        switch (type) {
            case 'credited':
                return creditedList;
            case 'debited':
                return debitedList;
            default:
                return [...creditedList, ...debitedList].sort((a, b) => a.createdAt.getDate() - b.createdAt.getDate());
        }
    }
};
ListTransactionsUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('transactionsRepository')),
    __metadata("design:paramtypes", [Object])
], ListTransactionsUseCase);
exports.ListTransactionsUseCase = ListTransactionsUseCase;
