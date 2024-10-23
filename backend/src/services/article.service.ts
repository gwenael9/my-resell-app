import { UserService } from "./user.service";
import db from "../lib/datasource";
import { Article, InputCreateArticle } from "../models/article";
import { CategorieService } from "./categorie.service";
import { RegexService } from "./regex.service";

const categorieService = new CategorieService();
const userService = new UserService();

export class ArticleService {
  private articleRepository;

  constructor() {
    this.articleRepository = db.getRepository(Article);
  }

  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepository.find({
      relations: ["user", "categorie"],
      select: {
        user: {
          // ajouter l'id ?
          email: true,
          username: true,
        },
      },
    });
  }

  async getArticleById(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ["user", "categorie"],
      select: {
        user: {
          id: true,
          email: true,
          username: true,
        },
      },
    });

    if (!article) {
      throw new Error("Article introuvable.");
    }

    return article;
  }

  async getArticlesByUser(userId: string): Promise<Article[]> {
    return await this.articleRepository.find({
      where: { user: { id: userId } },
      relations: ["categorie"],
    });
  }

  async createArticle(input: InputCreateArticle) {
    const { title, description, size, price, etat, categorieId, userId } =
      input;

    // validation des relations user et catégorie
    const [user, categorie] = await Promise.all([
      userService.findUserById(userId),
      categorieService.findCategorieById(categorieId),
    ]);

    if (!title || !description || !size || !price || !etat) {
      throw new Error("Tout les champs sont obligatoires !");
    }

    // vérifie le bon format du titre
    const formattedTitle = RegexService.formatName(title, "article");

    const validSizes = ["XS", "S", "M", "L", "XL", "TU"];
    if (!validSizes.includes(size)) {
      throw new Error(
        `La taille '${size}' n'est pas valide. Choisissez parmi : ${validSizes.join(
          ", "
        )}.`
      );
    }

    if (price < 0) {
      throw new Error("Le prix doit être positif.");
    }

    const article = this.articleRepository.create({
      title: formattedTitle,
      description,
      size,
      price,
      etat,
      categorie,
      user,
      createdAt: new Date(),
      // date de maj, par défaut elle correspond à la date de création
      updateAt: new Date(),
    });

    return await this.articleRepository.save(article);
  }

  async deleteArticle(id: number, userId: string) {
    const article = await this.getArticleById(id);

    if (article.user.id !== userId) {
      throw new Error("Cet article ne vous appartient pas.");
    }

    return await this.articleRepository.delete(id);
  }

  async updateArticle(id: number, input: Partial<InputCreateArticle>) {
    const { title, description, size, price, etat, categorieId, userId } =
      input;

    const article = await this.getArticleById(id);

    // vérification que l'utilisateur est bien celui qui a créé l'article
    if (userId && article.user.id !== userId) {
      throw new Error("Cet article ne vous appartient pas.");
    }

    // si des champs sont présents dans l'input, on les met à jour
    if (title) article.title = RegexService.formatName(title, "article");
    if (description) article.description = description;
    if (size) {
      const validSizes = ["XS", "S", "M", "L", "XL", "TU"];
      if (!validSizes.includes(size)) {
        throw new Error(
          `Taille '${size}' invalide. Choisissez parmi : ${validSizes.join(
            ", "
          )}`
        );
      }
      article.size = size;
    }
    if (price !== undefined && price >= 0) article.price = price;
    if (etat) article.etat = etat;

    // mise à jour de la catégorie si elle change
    if (categorieId) {
      const categorie = await categorieService.findCategorieById(categorieId);
      article.categorie = categorie;
    }

    // mise à jour de la date de modification
    article.updateAt = new Date();

    return await this.articleRepository.save(article);
  }
}
