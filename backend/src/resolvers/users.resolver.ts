import { Request, Response } from "express";
import { UserService } from "../services/users.service";

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
}
