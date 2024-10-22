import { UserService } from "./user.service";
import db from "../lib/datasource";
import { Article, InputCreateArticle } from "../models/article";
import { CategorieService } from "./categorie.service";
import { RegexService } from "./regex.service";

export class ArticleService {
  private articleRepository;

  constructor() {
    this.articleRepository = db.getRepository(Article);
  }

  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepository.find({
      relations: ["user", "categorie"],
    });
  }

  async getArticleById(id: number) {
    return await this.articleRepository.findOne({
      where: { id },
      relations: ["user", "categorie"],
    });
  }

  async getArticlesByUser(userId: string): Promise<Article[]> {
    return await this.articleRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "categorie"],
    });
  }

  async createArticle({
    title,
    description,
    size,
    price,
    etat,
    categorieId,
    userId,
  }: InputCreateArticle) {
    const userService = new UserService();
    const categorieService = new CategorieService();

    const user = await userService.findUserById(userId);
    if (!user) {
      throw new Error("L'utilisateur associé n'existe pas !");
    }

    const categorie = await categorieService.findCategorieById(categorieId);
    if (!categorie) {
      throw new Error("La catégorie associé n'existe pas !");
    }

    if (!title || !description) {
      throw new Error("Le titre et la description sont obligatoires !");
    }

    // vérifie le bon format du titre
    const formattedTitle = RegexService.formatName(title, "article");

    // vérifie le bon format de la description
    const formattedDescription = RegexService.formatName(
      description,
      "article"
    );

    const validSizes = ["S", "M", "L", "XL"];
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

    const createdAt = new Date();

    const article = this.articleRepository.create({
      title: formattedTitle,
      description: formattedDescription,
      size,
      price,
      etat,
      categorie,
      user,
      createdAt,
    });

    return await this.articleRepository.save(article);
  }

  async deleteArticle(id: number, userId: string) {
    const article = await this.getArticleById(id);
    if (!article) {
      throw new Error("Article indisponible.");
    }

    if (article.user.id !== userId) {
      throw new Error("Cet article ne vous appartient pas.")
    }

    return await this.articleRepository.delete(id);
  }
}
