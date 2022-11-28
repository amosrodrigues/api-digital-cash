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
exports.CreateAccountUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../errors/AppError");
let CreateAccountUseCase = class CreateAccountUseCase {
    accountsRepository;
    constructor(accountsRepository) {
        this.accountsRepository = accountsRepository;
    }
    async execute({ balance, id }) {
        const categoryAlreadyExists = await this.accountsRepository.findById(id);
        if (categoryAlreadyExists) {
            throw new AppError_1.AppError('Esta conta já existe!');
        }
        await this.accountsRepository.create({ balance });
    }
};
CreateAccountUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('accountsRepository')),
    __metadata("design:paramtypes", [Object])
], CreateAccountUseCase);
exports.CreateAccountUseCase = CreateAccountUseCase;
