import { Request, Response } from 'express';
import AuthService from './AuthService';
import UserRepository from './UserRepository';
import { DataSource } from 'typeorm';

class AuthController {
  private authService: AuthService;

  constructor(dataSource: DataSource) {
    const userRepository = new UserRepository(dataSource);
    this.authService = new AuthService(userRepository);
  }

  // Registrar un nuevo usuario
  async register(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    try {
      const user = await this.authService.register(username, email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Iniciar sesión
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const result = await this.authService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}

export default AuthController;