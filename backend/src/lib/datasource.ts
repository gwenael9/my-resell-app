import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Categorie } from "../models/categorie";
import { Article } from "../models/article";
import { Like } from "../models/like";
import { Panier } from "../models/panier";
import { Facture } from "../models/facture";

const db = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME,
  entities: [User, Categorie, Article, Like, Panier, Facture],
  synchronize: true,
  logging: true,
});

export default db;
