import { InputRegister, ROLE, User } from "../models/user";
import db from "../lib/datasource";
import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { RegexService } from "./regex.service";
import * as dotenv from "dotenv";

dotenv.config();

export class UserService {
  private userRepository;

  constructor() {
    this.userRepository = db.getRepository(User);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("Utilisateur inconnu.");
    }
    return user;
  }

  async getUserProfile(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    return user;
  }

  // créer un nouvel utilisateur
  async createUser({ email, password, username }: InputRegister) {
    // on vérifie le format du nom + la 1e lettre en maj
    const formattedName = RegexService.formatName(username, "username");

    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Vous avez déjà un compte, veuillez vous connecter.");
    }

    // on vérifie le format du mot de passe
    if (!RegexService.passwordRegex.test(password)) {
      throw new Error("Le mot de passe n'est pas assez sécurisé !");
    }

    // hachage du mot de passe
    const hashedPassword = await argon2.hash(password);

    // on vérifie le format de l'email
    if (!RegexService.emailRegex.test(email)) {
      throw new Error("L'adresse email n'est pas bon au format !");
    }

    const role = this.defineUserRole(email);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      username: formattedName,
      role,
    });

    return await this.userRepository.save(user);
  }

  // définir le rôle
  private defineUserRole(email: string): ROLE {
    const emails = process.env.ADMIN_EMAILS || "";

    // séparer la chaîne en un tableau d'emails
    const adminEmails = emails.split(",").map((e) => e.trim());
    return adminEmails.includes(email) ? "ADMIN" : "USER";
  }

  async verifyUser(email: string, password: string): Promise<User> {
    // on vérifie le format de l'email
    if (!RegexService.emailRegex.test(email)) {
      throw new Error("L'adresse email n'est pas bon au format !");
    }

    const user = await this.findUserByEmail(email);
    const messageError = "E-mail et/ou mot de passe incorrect.";

    if (!user) {
      throw new Error(messageError);
    }

    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword) {
      throw new Error(messageError);
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
