import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
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
// dotenv.config();

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear el cuerpo de las solicitudes como JSON

// Conexión a la base de datos
// createConnection()
//   .then(() => {
//     console.log('Conexión a la base de datos establecida');
//   })
//   .catch((error) => {
//     console.error('Error al conectar a la base de datos:', error);
//   });

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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});