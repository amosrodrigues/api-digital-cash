"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRoutes = void 0;
const express_1 = require("express");
const AuthenticateUserControler_1 = require("../modules/accounts/useCases/authenticateUser/AuthenticateUserControler");
const authenticateRoutes = (0, express_1.Router)();
exports.authenticateRoutes = authenticateRoutes;
const authenticateUserController = new AuthenticateUserControler_1.AuthenticateUserController();
authenticateRoutes.post('/sessions', authenticateUserController.handle);
