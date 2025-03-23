"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
class UserRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repository = dataSource.getRepository(User_1.default);
    }
    // Buscar un usuario por correo electrónico
    async findByEmail(email) {
        return this.repository.findOne({ where: { email } });
    }
    // Guardar un nuevo usuario
    async save(userData) {
        const user = this.repository.create(userData);
        return this.repository.save(user);
    }
}
exports.default = UserRepository;
