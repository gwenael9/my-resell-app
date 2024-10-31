import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import { formatArticleDates } from "../utils/formatDate";

const articleService = new ArticleService();

export class ArticleController {
  // récupérer tous les articles
  static async getAllArticles(req: Request, res: Response): Promise<void> {
    const user = req.user;
    try {
      const articles = await articleService.getAllArticles(user?.id);

      // formatter le renvoie des dates
      const formattedArticles = articles.map(formatArticleDates);

      res.status(200).json(articles);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des articles." });
    }
  }

  // récupérer les articles d'un utilisateur
  static async getArticlesByUser(req: Request, res: Response): Promise<void> {
    const user = req.user;

    if (!user) {
      res.status(400).json({ message: "Utilisateur inconnu." });
      return;
    }

    try {
      const articles = await articleService.getArticlesByUser(user.id);

      // formatter le renvoie des dates
      const formattedArticles = articles.map(formatArticleDates);

      res.status(200).json(formattedArticles);
    } catch (error) {
      res.status(500).json({
        message:
          "Erreur lors de la récupération des articles de l'utilisateur.",
      });
    }
  }

  // récupéré un article par id
  static async getArticleById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const article = await articleService.getArticleById(parseInt(id));

      // formatter le renvoie des dates
      const formattedArticles = formatArticleDates(article);

      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // création d'un article
  static async createArticle(req: Request, res: Response): Promise<void> {
    const user = req.user;

    const { title, description, size, price, etat, categorieId, imageAlt } = req.body;

    if (!user) {
      res.status(400).json({ message: "Utilisateur inconnu" });
      return;
    }

    const infos = {
      title,
      description,
      size,
      price,
      etat,
      categorieId,
      userId: user.id,
      imageAlt,
    };

    try {
      const article = await articleService.createArticle(infos);

      // formatter le renvoie des dates
      const formattedArticles = formatArticleDates(article);

      res.status(201).json(formattedArticles);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // supprimer un article
  static async deleteArticle(req: Request, res: Response): Promise<void> {
    const user = req.user;
    const { id: articleId } = req.params;

    if (!user) {
      res.status(400).json({ message: "Utilisateur non valide." });
      return;
    }

    try {
      await articleService.deleteArticle(parseInt(articleId), user.id);
      res.status(200).json({ message: "L'article a bien été supprimé." });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // mettre à jour un article
  static async updateArticle(req: Request, res: Response): Promise<void> {
    const user = req.user;
    const { id: articleId } = req.params;
    const { title, description, size, price, etat, categorieId } = req.body;

    if (!user) {
      res.status(400).json({ message: "Utilisateur non valide." });
      return;
    }

    try {
      const updateData = {
        title,
        description,
        size,
        price,
        etat,
        categorieId,
        userId: user.id,
      };

      const updatedArticle = await articleService.updateArticle(
        parseInt(articleId),
        updateData
      );

      // formatter le renvoie des dates
      const formattedArticles = formatArticleDates(updatedArticle);

      res.status(200).json(formattedArticles);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
