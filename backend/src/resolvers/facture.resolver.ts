import { Request, Response } from "express";
import { FactureService } from "../services/facture.service";

const factureService = new FactureService();

export class FactureController {
  // récupérer toutes les factures d'un user
  static async getAllFacture(req: Request, res: Response) {
    const user = req.user;

    if (!user) {
      res.status(500).json("Utilisateur inconnu.");
      return;
    }

    try {
      const factures = await factureService.getAllFactures(user.id);
      res.status(200).json(factures);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  // récupérer une facture d'un user
  static async getOneFacture(req: Request, res: Response) {
    const user = req.user;
    const { id: factureId } = req.params;

    if (!user) {
      res.status(500).json("Utilisateur inconnu.");
      return;
    }

    try {
      const facture = await factureService.getFactureById(
        user.id,
        parseInt(factureId)
      );
      res.status(200).json(facture);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
