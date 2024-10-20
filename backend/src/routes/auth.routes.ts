import { Router } from "express";
import { UserController } from "../resolvers/users.resolver";

const router = Router();

// Utilisation correcte du contrôleur avec une fonction intermédiaire
router.post("/register", async (req, res) => {
  console.log("titi");
  await UserController.registerUser(req, res);
});

export default router;
