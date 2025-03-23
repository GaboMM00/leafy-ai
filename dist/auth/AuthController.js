"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("./AuthService"));
const UserRepository_1 = __importDefault(require("./UserRepository"));
class AuthController {
    constructor(dataSource) {
        const userRepository = new UserRepository_1.default(dataSource);
        this.authService = new AuthService_1.default(userRepository);
    }
    // Registrar un nuevo usuario
    async register(req, res) {
        const { username, email, password } = req.body;
        try {
            const user = await this.authService.register(username, email, password);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    // Iniciar sesión
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const result = await this.authService.login(email, password);
            res.json(result);
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}
exports.default = AuthController;
