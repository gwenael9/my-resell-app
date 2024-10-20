import express from "express";
import { User } from "./models/user";

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}
