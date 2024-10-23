import { InputRegister, User } from "../models/user";
import db from "../lib/datasource";
import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { RegexService } from "./regex.service";

export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = db.getRepository(User);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("Utilisateur introuvable.");
    }
    return user;
  }

  // créer un nouvel utilisateur
  async createUser({ email, password, username, role }: InputRegister) {
    // on vérifie le format du nom + la 1e lettre en maj
    const formattedName = RegexService.formatName(username, "username");

    // on vérifie le format du mot de passe
    if (!RegexService.passwordRegex.test(password)) {
      throw new Error("Le mot de passe n'est pas assez sécurisé !");
    }

    // hachage du mot de passe
    const hashedPassword = await argon2.hash(password);

    // on vérifie le format de l'email
    if (!RegexService.emailRegex.test(email)) {
      throw new Error("L'adresse email n'est bon au format !");
    }

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      username: formattedName,
      role: role || "USER",
    });
    return await this.userRepository.save(user);
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error("Compte inconnu");
    }

    /*
    if (!user.password.startsWith('$')) {
      throw new Error("Le mot de passe enregistré n'est pas au bon format !");
    }
    */

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

  // supprimer un utilisateur
  async deleteUser(id: string) {
    await this.findUserById(id);
    return await this.userRepository.delete(id);
  }

  // modifier le mot de passe
  async updatePassword(id: string, currentPassword: string, password: string) {
    const user = await this.findUserById(id);

    if (currentPassword === password) {
      throw new Error("Le nouveau mot de passe ne doit pas être identique.");
    }

    // vérifier si l'ancien mot de passe est le bon
    const isValidPassword = await argon2.verify(user.password, currentPassword);
    if (!isValidPassword) {
      throw new Error("Le mot de passe actuel est incorrect !");
    }

    if (!RegexService.passwordRegex.test(password)) {
      throw new Error("Le nouveau mot de passe n'est pas au bon format !");
    }

    user.password = await argon2.hash(password);
    return await this.userRepository.save(user);
  }

  // modifier le nom d'utilisateur
  async updateUsername(id: string, username: string) {
    const user = await this.findUserById(id);

    // on vérifie le format du nom
    const formattedName = RegexService.formatName(username, "username");

    user.username = formattedName;
    return await this.userRepository.save(user);
  }
}
