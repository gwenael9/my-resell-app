import { Router, Request, Response } from "express";
import { UserController } from "../resolvers/users.resolver";
import { MyContext } from "../index";

const router = Router();

// route d'inscription (register)
router.post("/register", async (req: Request, res: Response) => {
  const user = await UserController.register(req.body);
  res.status(201).json(user);
});

// route de connexion (login)
router.post("/login", async (req: Request, res: Response) => {
  const ctx: MyContext = { req, res, user: null };
  const message = await UserController.login(req.body, ctx);
  res.status(200).json(message);
});

// route de déconnexion (logout)
router.get("/logout", async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    const ctx: MyContext = { req, res, user };
    const message = await UserController.logout(ctx);
    res.status(200).json(message);
  } else {
    res.status(400).json({ message: "Erreuuuuuuur" });
  }
});

router.get("/me", async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: "Erreuuuuuuur" });
  }
});

export default router;
