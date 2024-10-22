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

  // créer une nouvelle catégorie
  static async createCategorie(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Le nom de la catégorie est requis." });
    }

    try {
      const categorie = await categorieService.createCategorie(name);
      res.status(201).send(categorie);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // supprimer une catégorie
  static async deleteCategorie(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await categorieService.deleteCategorie(parseInt(id));
      res.status(200).json({ message: "La catégorie a bien été supprimée." });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // modifier une catégorie
  static async updateCategorie(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res
        .status(400)
        .json({ message: "Le nouveau nom de la catégorie est requis." });
    }

    try {
      const updatedCategorie = await categorieService.updateCategorie(
        parseInt(id),
        name
      );
      res.status(200).json(updatedCategorie);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
