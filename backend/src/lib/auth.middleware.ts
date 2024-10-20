import express, { Request, Response, NextFunction } from "express";
import Cookies from "cookies";
import { UserService } from "../services/users.service";
import { jwtVerify } from "jose";
import { Payload } from "..";
import { User } from "../models/user";

const userService = new UserService();

declare global {
    namespace Express {
      interface Request {
        user?: User | null; // Ajouter une propriété user au type Request
      }
    }
  }

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let user: User | null = null;
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");

  if (token) {
    try {
      const verify = await jwtVerify<Payload>(
        token,
        new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
      );
      user = await userService.findUserByEmail(verify.payload.email);
      req.user = user;
    } catch (err) {
      cookies.set("token"); // Supprimer le token si invalide
    }
  }
  
  next();
};
