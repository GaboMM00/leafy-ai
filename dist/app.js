"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./auth/User"));
const authRoutes_1 = __importDefault(require("./auth/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configuración de TypeORM
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User_1.default],
    synchronize: true,
});
// Conexión a la base de datos
dataSource
    .initialize()
    .then(() => {
    console.log('Conexión a la base de datos establecida');
    // Rutas de autenticación
    app.use('/api/auth', (0, authRoutes_1.default)(dataSource));
    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});
