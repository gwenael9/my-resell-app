import express, { Request, Response, NextFunction } from "express";
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

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user: User | null = null;
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");

  if (token) {
    try {
      const verify = await jwtVerify<Payload>(
        token,
        new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
      );
      // si on le token est lié à un user, on le stock le user dans notre context
      user = await userService.findUserByEmail(verify.payload.email);
      req.user = user;
    } catch (err) {
      // supprime le token si invalide
      cookies.set("token");
    }
  }

  next();
};
