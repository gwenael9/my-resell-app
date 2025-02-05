import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Categorie } from "../models/categorie";
import { Article } from "../models/article";
import { Like } from "../models/like";
import { Panier } from "../models/panier";
import { Facture } from "../models/facture";
import { ArticleHistory } from "../models/articleHistory";
import * as dotenv from "dotenv";

dotenv.config();

const db = new DataSource({
  // type: "sqlite",
  // database: "./mydb.sqlite3",
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "0") || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "postgres",
  entities: [User, Categorie, Article, Like, Panier, Facture, ArticleHistory],
  synchronize: true,
  logging: true,
});

export default db;
