import { Router } from 'express';
import { DataSource } from 'typeorm';
import AuthController from './AuthController';

export default function createAuthRoutes(dataSource: DataSource): Router {
  const router = Router();
  const authController = new AuthController(dataSource);

  // Ruta para registrar un nuevo usuario
  router.post('/register', (req, res) => authController.register(req, res));

  // Ruta para iniciar sesión
  router.post('/login', (req, res) => authController.login(req, res));

  return router;
}