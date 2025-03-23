import { DataSource, Repository } from 'typeorm';
import User from './User';

class UserRepository {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  // Buscar un usuario por correo electrónico
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  // Guardar un nuevo usuario
  async save(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }
}

export default UserRepository;