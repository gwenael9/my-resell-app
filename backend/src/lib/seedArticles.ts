import db from "./datasource";
import { UserService } from "../services/user.service";
import * as dotenv from "dotenv";
import { ArticleService } from "../services/article.service";

dotenv.config();

// Initialiser TypeORM
db.initialize()
  .then(async () => {
    console.log("Base de données initialisée.");

    // title, description, size, price, etat, categorieId, userId, imageAlt
    // ramener ce seed dans l'autre pour avoir l'userId

    const articleService = new ArticleService();
    const userService = new UserService();

    const article = {
        title: "titre de mon article 1",
        description: "description de mon article 1",
        size: "M",
        price: 30,
        etat: "Neuf avec étiquette",
        categorieId: 1,
        userId: "",
        imageAlt: "t-shirt"
    }


    try {
      
      
    } catch (error) {
      console.error(
        "Erreur lors de la création du compte ou du panier :",
        error
      );
    }
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données :", error);
    process.exit(1); // Arrête le script en cas d'erreur
  });
