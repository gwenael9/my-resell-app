import db from "./datasource";
import { UserService } from "../services/user.service";
import { InputRegister } from "../models/user";
import * as dotenv from "dotenv";
import { CategorieService } from "../services/categorie.service";
import { ArticleService } from "../services/article.service";

dotenv.config();

// Initialiser TypeORM
db.initialize()
  .then(async () => {

    const userService = new UserService();
    const categorieService = new CategorieService();
    const articleService = new ArticleService();

    // Données d'exemple pour un nouvel utilisateur
    const userData: InputRegister = {
      email: "admin@mail.com",
      username: "admin",
      password: process.env.PASSWORD || "",
    };

    const categories = [
      "Manteaux et vestes",
      "Hauts et t-shirts",
      "Sweats et pulls",
      "Pantalons",
      "Shorts",
      "Autres",
    ];

    try {
      const alreadyAccount = await userService.findUserByEmail(userData.email);

      if (!alreadyAccount) {
        // crée un nouvel utilisateur
        await userService.createUser(userData);
      }

      // vérifier si l'user existe et que le mot de passe est correct
      const user = await userService.verifyUser(
        userData.email,
        userData.password
      );

      // on créé nos catégorie
      for (let index = 0; index < categories.length; index++) {
        const alreadyCategorie = await categorieService.findCategorieByName(
          categories[index]
        );

        if (alreadyCategorie) {
          continue;
        }

        // si la catégorie n'existe pas encore, on la crée
        await categorieService.createCategorie(categories[index]);
      }

      // on créé les articles
      const articles = [
        {
          title: "manteaux d'hiver",
          description: "je vend mon manteau car il est trop petit pour moi",
          size: "M",
          price: 50,
          etat: "Très bon état",
          categorieId: 1,
          userId: user.id,
          imageAlt: "manteau",
        },
        {
          title: "t-shirt nike",
          description: "t-shirt jamais porté, trop grand pour moi",
          size: "L",
          price: 20,
          etat: "Neuf avec étiquette",
          categorieId: 2,
          userId: user.id,
          imageAlt: "t-shirt",
        },
        {
          title: "sac the north face",
          description: "sac en très bon état, très pratique",
          size: "TU",
          price: 60,
          etat: "Très bon état",
          categorieId: 6,
          userId: user.id,
          imageAlt: "sac",
        },
        {
          title: "pull noir levis",
          description: "pull en bon état",
          size: "M",
          price: 10,
          etat: "Bon état",
          categorieId: 3,
          userId: user.id,
          imageAlt: "pull",
        },
        {
          title: "jean carhartt",
          description: "jean gris en très bon état, bonne qualité",
          size: "S",
          price: 40,
          etat: "Très bon état",
          categorieId: 4,
          userId: user.id,
          imageAlt: "jean",
        },
      ];

      for (let index = 0; index < articles.length; index++) {
        await articleService.createArticle(articles[index]);
      }

    } catch (error) {
      console.error(
        "Erreur lors de la création du compte ou du panier :",
        error
      );
    }
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données :", error);
    process.exit(1);
  });
