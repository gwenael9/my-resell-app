import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import { Message } from "../models/message";

const userService = new UserService();

export class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const infos = req.body;
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await userService.findUserByEmail(infos.email);
      if (existingUser) {
        return res.status(400).json({ message: "Utilisateur déjà existant." });
      }

      // Créer l'utilisateur
      const user = await userService.createUser(infos);

      // Retourner l'utilisateur créé
      res.status(201).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la création de l'utilisateur." });
    }
  }

  static async loginUser(req: Request, res: Response) {
    const m = new Message();
    try {
      const infos = req.body;

      // vérifier si l'user existe et que le mot de passe est correct
      const user = await userService.verifyUser(infos.email, infos.password);

      if (!user) {
        throw new Error("E-mail et/ou mot de passe incorrect.");
      }

      const token = await userService.genereToken(user);
      console.log(token);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 12 * 60 * 60 * 1000,
      });

      m.message = `Bienvenue ${user.username}`;
      m.success = true;

      res.status(200).json(m);
    } catch (err) {
      m.message = (err as Error).message || "Erreur lors de la connexion";
      m.success = false;

      res.status(401).json(m);
    }
  }
}
