"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createAuthRoutes;
const express_1 = require("express");
const AuthController_1 = __importDefault(require("./AuthController"));
function createAuthRoutes(dataSource) {
    const router = (0, express_1.Router)();
    const authController = new AuthController_1.default(dataSource);
    // Ruta para registrar un nuevo usuario
    router.post('/register', (req, res) => authController.register(req, res));
    // Ruta para iniciar sesión
    router.post('/login', (req, res) => authController.login(req, res));
    return router;
}
