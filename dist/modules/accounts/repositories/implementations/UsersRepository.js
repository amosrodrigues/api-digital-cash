"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const User_1 = require("../../entities/User");
const database_1 = require("../../../../database");
const Account_1 = require("../../entities/Account");
const Transactions_1 = require("../../../transactions/entities/Transactions");
class UsersRepository {
    repository;
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(User_1.User);
    }
    async insertBalance(balance) {
        const { identifiers } = await database_1.AppDataSource.createQueryBuilder()
            .insert()
            .into(Account_1.Account)
            .values([{ balance }])
            .execute();
        return identifiers[0].id;
    }
    async insertTransaction({ value, creditedAccountId, }) {
        await database_1.AppDataSource.createQueryBuilder()
            .insert()
            .into(Transactions_1.Transaction)
            .values([{ value, creditedAccountId }])
            .execute();
    }
    async create({ username, password, id }) {
        const accountId = await this.insertBalance(10000);
        await this.insertTransaction({ creditedAccountId: accountId, value: 10000 });
        const user = this.repository.create({
            username,
            password,
            id,
            accountId,
        });
        await this.repository.save(user);
    }
    async findByUserName(username) {
        const user = await this.repository.findOne({
            where: { username },
            relations: ['account'],
        });
        return user;
    }
    async findById(id) {
        const user = await this.repository.findOne({
            where: { id },
            relations: ['account'],
            select: {
                id: true,
                account: { balance: true, id: true },
                username: true,
                accountId: true,
            },
        });
        return user;
    }
}
exports.UsersRepository = UsersRepository;
