"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    // Registrar un nuevo usuario
    async register(username, email, password) {
        // Verificar si el usuario ya existe
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }
        // Cifrar la contraseña
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Guardar el usuario en la base de datos
        const user = await this.userRepository.save({ username, email, password: hashedPassword });
        return user;
    }
    // Iniciar sesión
    async login(email, password) {
        // Buscar al usuario por correo electrónico
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // Verificar la contraseña
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Contraseña incorrecta');
        }
        // Generar un token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
    }
}
exports.default = AuthService;
