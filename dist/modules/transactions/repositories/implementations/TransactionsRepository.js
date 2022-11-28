"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsRepository = void 0;
const database_1 = require("../../../../database");
const typeorm_1 = require("typeorm");
const Transactions_1 = require("../../entities/Transactions");
const User_1 = require("../../../accounts/entities/User");
const Account_1 = require("../../../accounts/entities/Account");
class TransactionsRepository {
    repository;
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Transactions_1.Transaction);
    }
    async getUserBalance(username) {
        const usersRepository = database_1.AppDataSource.manager.getRepository(User_1.User);
        const user = await usersRepository.findOne({
            where: {
                username,
            },
            relations: {
                account: true,
            },
        });
        return user;
    }
    async updateBalance({ value, creditedAccountId, debitedAccountId, }) {
        await database_1.AppDataSource.createQueryBuilder()
            .update(Account_1.Account)
            .set({
            balance: () => `balance + ${value}`,
        })
            .where({ id: creditedAccountId })
            .execute();
        await database_1.AppDataSource.createQueryBuilder()
            .update(Account_1.Account)
            .set({
            balance: () => `balance - ${value}`,
        })
            .where({ id: debitedAccountId })
            .execute();
    }
    async create({ value, creditedAccountId, debitedAccountId, }) {
        await this.updateBalance({
            value,
            creditedAccountId,
            debitedAccountId,
        });
        const transaction = this.repository.create({
            value,
            creditedAccountId,
            debitedAccountId,
        });
        await this.repository.save(transaction);
    }
    async findById(id) {
        const transaction = await this.repository.findOne({ where: { id } });
        return transaction;
    }
    async list({ userId, startDate, endDate }) {
        const usersRepository = database_1.AppDataSource.manager.getRepository(User_1.User);
        const user = await usersRepository.findOne({
            where: { id: userId },
            relations: { account: true },
        });
        const accountId = user.account.id;
        const firstDate = startDate || new Date('2022-11-01');
        const secondDate = endDate || new Date(Date.now()).toDateString();
        const endDateFormated = new Date(secondDate);
        const lastDate = endDateFormated.setDate(endDateFormated.getDate() + 1);
        const transactionsCredited = await this.repository.find({
            relations: ['account'],
            where: {
                creditedAccountId: accountId,
                createdAt: (0, typeorm_1.Between)(new Date(firstDate), new Date(lastDate)),
            },
            order: {
                createdAt: 'ASC',
            },
        });
        const transactionsDebited = await this.repository.find({
            relations: ['account'],
            where: {
                debitedAccountId: accountId,
                createdAt: (0, typeorm_1.Between)(new Date(firstDate), new Date(lastDate)),
            },
            order: {
                createdAt: 'ASC',
            },
        });
        const trasactions = {
            credited: transactionsCredited,
            debited: transactionsDebited,
        };
        return trasactions;
    }
}
exports.TransactionsRepository = TransactionsRepository;
