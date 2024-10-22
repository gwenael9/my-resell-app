import { Request, Response, NextFunction } from "express";
import Cookies from "cookies";
import { UserService } from "../services/user.service";
import { jwtVerify } from "jose";
import { Payload } from "..";
import { User } from "../models/user";

const userService = new UserService();

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}

// vérifier si l'user est connecté
export const lookToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    res.status(400).json({ message: "Vous êtes déjà connecté." });
    return;
  }
  next();
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let user: User | null = null;
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");

  if (token) {
    try {
      const verify = await jwtVerify<Payload>(
        token,
        new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
      );
      // si le token est lié à un user, on le stock dans notre context
      user = await userService.findUserByEmail(verify.payload.email);
      req.user = user;
    } catch (err) {
      // supprime le token si invalide
      cookies.set("token");
    }
  }

  next();
};

export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User | null | undefined = req.user;

  if (!user) {
    res
      .status(403)
      .json({ message: "Accès refusé : Utilisateur non authentifié." });
  } else if (user.role !== "ADMIN") {
    res
      .status(403)
      .json({ message: "Accès refusé : Vous n'êtes pas administrateur." });
  }
  next();
};
