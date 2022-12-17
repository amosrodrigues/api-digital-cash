"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const UsersRepository_1 = require("../../modules/accounts/repositories/implementations/UsersRepository");
const TransactionsRepository_1 = require("../../modules/transactions/repositories/implementations/TransactionsRepository");
const AccountsRepository_1 = require("../../modules/accounts/repositories/implementations/AccountsRepository");
tsyringe_1.container.registerSingleton('transactionsRepository', TransactionsRepository_1.TransactionsRepository);
tsyringe_1.container.registerSingleton('accountsRepository', AccountsRepository_1.AccountsRepository);
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.UsersRepository);
