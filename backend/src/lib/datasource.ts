import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Categorie } from "../models/categorie";
import { Article } from "../models/article";
import { Like } from "../models/like";
import { Panier } from "../models/panier";
import { Facture } from "../models/facture";
import * as dotenv from "dotenv";
import { History } from "../models/articleHistory";

dotenv.config();

const db = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "0") || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "1234",
  database: process.env.DB_NAME || "reselldb",
  entities: [User, Categorie, Article, Like, Panier, Facture, History],
  synchronize: true,
  logging: true,
});

export default db;
