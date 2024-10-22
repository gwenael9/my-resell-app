import { UserService } from "../services/user.service";
import Cookies from "cookies";
import { Request, Response } from "express";
import { InputLogin, InputRegister, User } from "../models/user";

const userService = new UserService();

export class UserController {
  // création de compte ==> retourne l'user créé
  static async register(req: Request, res: Response) {
    const infos: InputRegister = req.body;
    try {
      // vérifier si l'utilisateur existe déjà
      const existingUser = await userService.findUserByEmail(infos.email);
      if (existingUser) {
        res.status(400).json({ message: "Cet email est déjà pris !" });
        return;
      }

      // créer l'utilisateur
      const user = await userService.createUser(infos);
      res.status(201).json(user);
    } catch (error) {
      res
        .status(400)
        .json({ message: (error as Error).message });
    }
  }

  // connexion ==> retourne un message
  static async login(req: Request, res: Response) {
    const infos: InputLogin = req.body;
    try {
      // vérifier si l'user existe et que le mot de passe est correct
      const user = await userService.verifyUser(infos.email, infos.password);

      if (!user) {
        res
          .status(400)
          .json({ message: "E-mail et/ou mot de passe incorrect." });
      }

      // on créé le token
      const token = await userService.genereToken(user);

      // on le place dans les cookies
      const cookies = new Cookies(req, res);
      cookies.set("token", token, { httpOnly: true });

      res.status(200).json({ message: `Bienvenue ${user.username}` });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // déconnexion ==> retourne un message
  static async logout(req: Request, res: Response) {
    try {
      const cookies = await new Cookies(req, res);
      cookies.set("token");

      res.status(200).json({ message: "Déconnexion réussite" });
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }
  }

  // obtenir le profil de l'user connecté
  static async getProfile(req: Request, res: Response) {
    const user = req.user;

    // si aucun user connecté
    if (!user) {
      res.status(400).json({ message: "Utilisateur inconnu" });
      return;
    }

    // on renvoie les infos
    res.status(200).json(user);
  }

  // supprimer un user
  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await userService.deleteUser(id);
      res.status(200).json({ message: "L'utilisateur a bien été supprimé." });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // modifier son mot de passe
  static async updatePassword(req: Request, res: Response) {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ message: "Les mots de passe sont requis." });
      return;
    }

    // si aucun user connecté
    if (!user) {
      res.status(400).json({ message: "Utilisateur inconnu" });
      return;
    }

    try {
      await userService.updatePassword(
        user.id,
        currentPassword,
        newPassword
      );
      res.status(200).json({ message: "Le mot de passe a bien été modifié."});
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // modifier son nom d'utilisateur
  static async updateUsername(req: Request, res: Response) {
    const user = req.user;
    const { username } = req.body;

    // si aucun user connecté
    if (!user) {
      res.status(400).json({ message: "Utilisateur inconnu" });
      return;
    }

    try {
      const updatedUsername = await userService.updateUsername(
        user.id,
        username
      );
      res.status(200).json(updatedUsername);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
