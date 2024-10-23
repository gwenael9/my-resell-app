import { Router } from "express";
import { FactureController } from "../resolvers/facture.resolver";

const router = Router();

// route pour récupérer les factures
router.get("/factures", FactureController.getAllFacture);

// route pour récupérer une facture
router.get("/facture/:id", FactureController.getOneFacture);

export default router;
