import { Request, Response } from "express";
import { PanierService } from "../services/panier.service";

const panierService = new PanierService();

export class PanierController {
  // obtenir soon panier
  static async getPanier(req: Request, res: Response) {
    const user = req.user;
    if (!user) {
      res.status(500).json({ message: "Utilisateur inconnu." });
      return;
    }

    try {
      const panier = await panierService.getUserPanier(user.id);
      res.status(200).json(panier);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  // ajouter un article au panier
  static async addArticle(req: Request, res: Response) {
    const user = req.user;
    const { id: articleId } = req.params;

    if (!user) {
      res.status(500).json({ message: "Utilisateur inconnu." });
      return;
    }

    try {
      const message = await panierService.addArticleToPanier(
        user.id,
        parseInt(articleId)
      );
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  // supprimer un article d'un panier
  static async removeArticle(req: Request, res: Response) {
    const user = req.user;
    const { id: articleId } = req.params;

    if (!user) {
      res.status(500).json({ message: "Utilisateur inconnu." });
      return;
    }

    try {
      const message = await panierService.removeArticleFromPanier(
        user.id,
        parseInt(articleId)
      );
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  // valider son panier
  static async validatePanier(req: Request, res: Response) {
    const user = req.user;

    if (!user) {
      res.status(500).json({ message: "Utilisateur inconnu." });
      return;
    }

    try {
      const facture = await panierService.validatePanier(user.id);
      res.status(200).json(facture);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
