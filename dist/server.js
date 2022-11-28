"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
require("./database");
require("./shared/container");
const AppError_1 = require("./errors/AppError");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = 3333;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(routes_1.router);
app.use((err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }
    console.log(err);
    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`,
    });
});
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
