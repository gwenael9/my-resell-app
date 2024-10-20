import express from "express";
import { User } from "./models/users";

export interface ContextType {
    req: express.Request;
    res: express.Response;
    currentUser?: User;
}