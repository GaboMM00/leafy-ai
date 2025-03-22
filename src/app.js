"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
// import authRoutes from './auth/authRoutes';
// import projectRoutes from './projects/projectRoutes';
// import postRoutes from './posts/postRoutes';
// import guideRoutes from './guides/guideRoutes';
// import commentRoutes from './comments/commentRoutes';
// import likeRoutes from './likes/likeRoutes';
// import searchRoutes from './search/searchRoutes';
// import badgeRoutes from './badges/badgeRoutes';
// import friendRoutes from './friends/friendRoutes';
// import storageRoutes from './storage/storageRoutes';
// Cargar variables de entorno
dotenv_1.default.config();
// Crear la aplicación Express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)()); // Habilitar CORS
app.use(express_1.default.json()); // Parsear el cuerpo de las solicitudes como JSON
// Conexión a la base de datos
(0, typeorm_1.createConnection)()
    .then(() => {
    console.log('Conexión a la base de datos establecida');
})
    .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});
// Registrar rutas
// app.use('/api/auth', authRoutes); // Rutas de autenticación
// app.use('/api/projects', projectRoutes); // Rutas de proyectos
// app.use('/api/posts', postRoutes); // Rutas de publicaciones
// app.use('/api/guides', guideRoutes); // Rutas de guías
// app.use('/api/comments', commentRoutes); // Rutas de comentarios
// app.use('/api/likes', likeRoutes); // Rutas de likes
// app.use('/api/search', searchRoutes); // Rutas de búsqueda
// app.use('/api/badges', badgeRoutes); // Rutas de insignias
// app.use('/api/friends', friendRoutes); // Rutas de amigos
// app.use('/api/storage', storageRoutes); // Rutas de almacenamiento de archivos
// Middleware para manejar errores (opcional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal en el servidor' });
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
