"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsRepository = void 0;
const database_1 = require("../../../../database");
const Account_1 = require("../../entities/Account");
class AccountsRepository {
    repository;
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Account_1.Account);
    }
    async create({ balance }) {
        const account = this.repository.create({
            balance,
        });
        await this.repository.save(account);
    }
    async list() {
        const accounts = await this.repository.find();
        return accounts;
    }
    async findById(id) {
        const account = await this.repository.findOne({ where: { id } });
        return account;
    }
}
exports.AccountsRepository = AccountsRepository;
