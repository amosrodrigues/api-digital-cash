"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
const express_1 = require("express");
const ensureAutheticated_1 = require("../middlewares/ensureAutheticated");
const CreateTransactionsController_1 = require("../modules/transactions/useCases/createTransaction/CreateTransactionsController");
const ListTransactionsController_1 = require("../modules/transactions/useCases/listTransactions/ListTransactionsController");
const transactionsRoutes = (0, express_1.Router)();
exports.transactionsRoutes = transactionsRoutes;
const createSpecificationController = new CreateTransactionsController_1.CreateTransactioController();
const listTransactionsController = new ListTransactionsController_1.ListTransactionsController();
transactionsRoutes.post('/create', ensureAutheticated_1.ensureAuthenticated, createSpecificationController.handle);
transactionsRoutes.post('/list', ensureAutheticated_1.ensureAuthenticated, listTransactionsController.handle);
