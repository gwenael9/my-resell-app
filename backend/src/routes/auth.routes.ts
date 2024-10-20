import { Router } from "express";
import { UserController } from "../resolvers/users.resolver";

const router = Router();

router.post("/register", async (req, res) => {
  await UserController.registerUser(req, res);
});

router.post("/login", async (req, res) => {
    await UserController.loginUser(req, res);
})

export default router;
