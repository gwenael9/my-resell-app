import { Router, Request, Response } from "express";
import { UserController } from "../resolvers/user.resolver";
import { MyContext } from "../index";

const router = Router();

// route d'inscription
router.post("/register", async (req: Request, res: Response) => {
  // on créé le compte
  const message = await UserController.register(req.body);

  if (!message.success) {
    res.status(400).json(message);
  }
  res.status(201).json(message);
});

// route de connexion
router.post("/login", async (req: Request, res: Response) => {
  // on vérifie si l'user est connecté
  const user = req.user;
  //  si oui, on renvoie un message d'erreur
  if (user) {
    res.status(400).json({ message: "Vous êtes déjà connecté." });
  }
  // si non, on le connecte
  const ctx: MyContext = { req, res, user: null };
  const message = await UserController.login(req.body, ctx);
  
  // on retourne un message
  if (!message.success) {
    res.status(400).json(message);
  }
  res.status(200).json(message);
});

// route de déconnexion
router.get("/logout", async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    const ctx: MyContext = { req, res, user };
    const message = await UserController.logout(ctx);
    res.status(200).json(message);
  } else {
    res.status(400).json({ message: "Utilisateur inconnu" });
  }
});

// route pour obtenir les infos de l'user connecté
router.get("/me", async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: "Utilisateur inconnu." });
  }
});

export default router;
