"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const ensureAutheticated_1 = require("../middlewares/ensureAutheticated");
const CreateUserController_1 = require("../modules/accounts/useCases/createUser/CreateUserController");
const GetUserController_1 = require("../modules/accounts/useCases/getUser/GetUserController");
const usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
const createUserController = new CreateUserController_1.CreateUserController();
const getUserController = new GetUserController_1.GetUserController();
usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/me', ensureAutheticated_1.ensureAuthenticated, getUserController.handle);
