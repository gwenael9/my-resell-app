import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import { RabbitMQ } from "../lib/rabbitmq";

const articleService = new ArticleService();

export class ArticleController {
  // récupérer tous les articles
  static async getAllArticles(req: Request, res: Response): Promise<void> {
    const { search } = req.query;
    const { categorie } = req.query;
    const user = req.user;
    const name = typeof search === "string" ? search : undefined;

    const categorieId = typeof categorie === "string" ? categorie : undefined;

    try {
      const articles = await articleService.getAllArticles(
        user?.id,
        name,
        categorieId
      );
      res.status(200).json(articles);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des articles." });
    }
  }

  // récupérer les articles d'un utilisateur
  static async getArticlesByUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const articles = await articleService.getArticlesByUser(id);

      res.status(200).json(articles);
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

      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // création d'un article
  static async createArticle(req: Request, res: Response): Promise<void> {
    const user = req.user;

    const { title, description, size, price, etat, categorieId, image } =
      req.body;

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
      image,
    };

    try {
      const article = await articleService.createArticle(infos);

      res
        .status(201)
        .json({ message: "L'article a bien été créé !", id: article.id });
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
    const { title, description, size, price, etat, categorieId, image } =
      req.body;

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
        image,
      };

      const existingArticle = await articleService.getArticleById(
        parseInt(articleId)
      );

      const article = await articleService.updateArticle(
        parseInt(articleId),
        updateData
      );

      const changes: Record<string, any> = {};
      Object.keys(updateData).forEach((key) => {
        const typedKey = key as keyof typeof updateData;

        // Vérifier si la clé est "categorieId" et comparer avec "categorie"
        if (typedKey === "categorieId") {
          if (updateData.categorieId !== existingArticle.categorie?.id) {
            changes.categorieId = {
              old: existingArticle.categorie?.id,
              new: updateData.categorieId,
            };
          }
        } else if (
          updateData[typedKey] !==
          existingArticle[typedKey as keyof typeof existingArticle]
        ) {
          changes[typedKey] = {
            old: existingArticle[typedKey as keyof typeof existingArticle],
            new: updateData[typedKey],
          };
        }
      });

      // Si des changements ont été faits, on envoie à RabbitMQ
      if (Object.keys(changes).length > 0) {
        await RabbitMQ.sendToQueue("article_queue", {
          articleId: article.id,
          title: article.title,
          action: "ARTICLE_UPDATED",
          changes,
        });
      }

      res
        .status(200)
        .json({ message: "Votre article a bien été mis à jour !" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
