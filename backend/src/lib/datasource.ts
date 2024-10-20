import { DataSource } from "typeorm";
import { User } from "../models/users";
import { Categorie } from "../models/categories";
import { Article } from "../models/articles";

const db = new DataSource({
    type: 'sqlite',
    database: './mydb.sqlite3',
    entities: [User, Categorie, Article],
    synchronize: true,
    logging: true
});

export default db;