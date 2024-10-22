import { InputRegister, User } from "../models/user";
import db from "../lib/datasource";
import * as argon2 from "argon2";
import { SignJWT } from "jose";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = db.getRepository(User);
  }

  private async formatName(name: string) {
    // l'username peut contenir seulement des chiffres et des lettres
    const lettersRegex = /^[A-Za-z0-9]+$/;

    if (name.length < 3) {
      throw new Error("Le nom d'utilisateur doit avoir au moins 3 caractères.");
    }

    if (!lettersRegex.test(name)) {
      throw new Error(
        "Le nom d'utilisateur doit contenir seulement des chiffres et des lettres."
      );
    }

    // mettre la 1ère lettre en majuscule et le reste en minuscule
    const formattedName =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    return formattedName;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  // créer un nouvel utilisateur
  async createUser({ email, password, username, role }: InputRegister) {
    // a supprimer
    if (!role) {
      role = "USER";
    }

    // on vérifie le format du nom + la 1e lettre en maj
    const formattedName = await this.formatName(username);

    // on vérifie le format du mot de passe
    if (!passwordRegex.test(password)) {
      throw new Error("Le mot de passe n'est pas assez sécurisé !");
    }

    // on vérifie le format de l'email
    if (!emailRegex.test(email)) {
      throw new Error("L'adresse email n'est bon au format !");
    }

    const user = this.userRepository.create({
      email,
      password,
      username: formattedName,
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

  // supprimer un utilisateur
  async deleteUser(id: string) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new Error("Cet utilisateur n'existe pas !");
    }

    return await this.userRepository.delete(id);
  }

  // modifier le mot de passe
  async updatePassword(id: string, password: string) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new Error("L'utilisateur n'existe pas !");
    }

    if (!passwordRegex.test(password)) {
      throw new Error("Le mot de passe n'est pas au bon format !");
    }

    user.password = password;
    return await this.userRepository.save(user);
  }

  // modifier le nom d'utilisateur
  async updateUsername(id: string, username: string) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new Error("L'utilisateur n'existe pas !");
    }

    // on vérifie le format du nom
    const formattedName = await this.formatName(username);

    user.username = formattedName;
    return await this.userRepository.save(user);
  }
}
