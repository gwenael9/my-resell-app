import { InputRegister, User } from "../models/user";
import db from "../lib/datasource";
import * as argon2 from "argon2";
import { SignJWT } from "jose";

export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = db.getRepository(User);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({ where: { id }});
  }

  // Créer un nouvel utilisateur
  async createUser({ email, password, username, role }: InputRegister) {
    const user = this.userRepository.create({
      email,
      password,
      username,
      role,
    });
    return await this.userRepository.save(user);
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error("Compte inconnu");
    }

    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword) {
      throw new Error("Mot de passe incorrect");
    }

    return user;
  }

  async genereToken(user: User) {
    const jwtSecret = process.env.JWT_PRIVATE_KEY;

    if (!jwtSecret) {
      throw new Error("La clé secrète JWT n'est pas définie.");
    }

    // généré un token JWT
    const token = await new SignJWT({ email: user.email, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("12h")
      .sign(new TextEncoder().encode(jwtSecret));

    return token;
  }
}
