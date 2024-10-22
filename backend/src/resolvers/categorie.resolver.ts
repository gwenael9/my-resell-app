import { Request, Response } from "express";
import { CategorieService } from "../services/categorie.service";

const categorieService = new CategorieService();

export class CategorieController {
  // récupérer tous les articles
  static async getAllCategorie(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categorieService.getAllCategorie();
      res.status(200).json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des catégories." });
    }
  }

  static async createCategorie(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Le nom de la catégorie est requis." });
    }

    try {
      const categorie = await categorieService.createCategorie(name);
      res.status(200).send(categorie);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la création de la catégorie." });
    }
  }
}
