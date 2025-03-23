import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from './UserRepository';
import User from './User';

class AuthService {
  constructor(private userRepository: UserRepository) {}

  // Registrar un nuevo usuario
  async register(username: string, email: string, password: string): Promise<User> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado');
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos
    const user = await this.userRepository.save({ username, email, password: hashedPassword });
    return user;
  }

  // Iniciar sesión
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    // Buscar al usuario por correo electrónico
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { token, user };
  }
}

export default AuthService;