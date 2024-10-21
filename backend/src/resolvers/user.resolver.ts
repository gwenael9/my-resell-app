import { UserService } from "../services/user.service";
import { Message } from "../models/message";
import Cookies from "cookies";
import { MyContext } from "..";
import { InputLogin, InputRegister, User } from "../models/user";

const userService = new UserService();

export class UserController {
  // création de compte ==> retourne l'user créé
  static async register(infos: InputRegister): Promise<Message> {
    const m = new Message();
    try {
      // vérifier si l'utilisateur existe déjà
      const existingUser = await userService.findUserByEmail(infos.email);
      if (existingUser) {
        m.message = "Cet email est déja pris !"
        m.success = false;
      }

      // créer l'utilisateur
      await userService.createUser(infos);

      m.message = "Compte créé avec succès !";
      m.success = true;

      // retourner l'utilisateur créé
    } catch (error) {
      m.message = "Erreur lors de la création de l'utilisateur";
      m.success = false;
    }
    return m;
  }

  // connexion ==> retourne un message
  static async login(infos: InputLogin, ctx: MyContext): Promise<Message> {
    const m = new Message();
    try {
      // vérifier si l'user existe et que le mot de passe est correct
      const user = await userService.verifyUser(infos.email, infos.password);

      if (!user) {
        throw new Error("E-mail et/ou mot de passe incorrect.");
      }

      const token = await userService.genereToken(user);
      const cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("token", token, { httpOnly: true });

      m.message = `Bienvenue ${user.username}`;
      m.success = true;
    } catch (err) {
      m.message = (err as Error).message;
      m.success = false;
    }
    return m;
  }

  // déconnexion ==> retourne un message
  static async logout(ctx: MyContext): Promise<Message> {
    const m = new Message();
    try {
      // supprime le cookie en assignant une date d'expiration passée
      const cookies = await new Cookies(ctx.req, ctx.res);
      cookies.set("token");

      m.message = "Déconnexion réussie.";
      m.success = true;
    } catch (err) {
      m.message = (err as Error).message;
      m.success = false;
    }
    return m;
  }
}
