import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Categorie } from "../models/categorie";
import { Article } from "../models/article";
import { Like } from "../models/like";

const db = new DataSource({
  type: "sqlite",
  database: "./mydb.sqlite3",
  entities: [User, Categorie, Article, Like],
  synchronize: true,
  logging: true,
});

export default db;
