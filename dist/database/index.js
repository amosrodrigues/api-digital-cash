"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../modules/accounts/entities/User");
const Account_1 = require("../modules/accounts/entities/Account");
const Transactions_1 = require("../modules/transactions/entities/Transactions");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'docker',
    password: 'ngcash',
    database: 'ngcash',
    synchronize: true,
    logging: true,
    entities: [User_1.User, Account_1.Account, Transactions_1.Transaction],
    migrations: ['./src/database/migrations/*.ts'],
    subscribers: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
