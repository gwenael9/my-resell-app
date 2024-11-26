import { UserService } from "../services/user.service";
import Cookies from "cookies";
import { Request, Response } from "express";
import { InputLogin, InputRegister, User } from "../models/user";
import { PanierService } from "../services/panier.service";

const userService = new UserService();
const panierService = new PanierService();

export class UserController {
  // création de compte
  static async register(req: Request, res: Response) {
    const infos: InputRegister = req.body;
    try {
      await userService.createUser(infos);
      res.status(201).json({ message: "Votre compte a bien été créé !" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
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

      // le panier de l'user est créé à sa première connexion
      const panier = await panierService.getUserPanier(user.id);
      if (!panier) {
        throw new Error("Le panier n'a pas été créé");
      }

      res.status(200).json({ message: `Bienvenue ${user.username} !` });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // déconnexion ==> retourne un message
  static async logout(req: Request, res: Response) {
    try {
      const cookies = await new Cookies(req, res);
      cookies.set("token");

      res.status(200).json({ message: "Déconnexion réussite." });
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de la déconnexion." });
    }
  }

  // obtenir le profil de l'user connecté
  static async getProfile(req: Request, res: Response) {
    const user = req.user;

    // si aucun user connecté
    if (!user) {
      res.status(400).json({ message: "Utilisateur inconnu." });
      return;
    }

    try {
      const userWithEmailAndUserName = await userService.getUserProfile(
        user.id
      );
      res.status(200).json(userWithEmailAndUserName);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
