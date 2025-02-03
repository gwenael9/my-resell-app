import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Categorie } from "../models/categorie";
import { Article } from "../models/article";
import { Like } from "../models/like";
import { Panier } from "../models/panier";
import { Facture } from "../models/facture";
import { ArticleHistory } from "../models/articleHistory";

const db = new DataSource({
  type: "sqlite",
  database: "./mydb.sqlite3",
  entities: [User, Categorie, Article, Like, Panier, Facture, ArticleHistory],
  synchronize: true,
  logging: true,
});

export default db;
