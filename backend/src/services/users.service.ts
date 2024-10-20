import { InputRegister, User } from '../models/users';
import db from '../lib/datasource';

export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = db.getRepository(User);
  }

  // Trouver un utilisateur par email
  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Créer un nouvel utilisateur
  async createUser({ email, password, role }: InputRegister) {
    const user = this.userRepository.create({ email, password, role });
    return await this.userRepository.save(user);
  }
}
