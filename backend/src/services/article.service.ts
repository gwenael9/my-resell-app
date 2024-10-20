import db from "../lib/datasource";
import { Article } from "../models/article";
import { Categorie } from "../models/categorie";
import { User } from "../models/user";

export class ArticleService {
  private articleRepository = db.getRepository(Article);

  // Créer un nouvel article
  async createArticle(
    name: string,
    description: string,
    userId: string,
    categorieId: number
  ): Promise<Article> {
    const categorieRepository = db.getRepository(Categorie);
    const userRepository = db.getRepository(User);

    // Trouver la catégorie et l'utilisateur
    const categorie = await categorieRepository.findOneBy({ id: categorieId });
    const user = await userRepository.findOneBy({ id: userId });

    if (!categorie) {
      throw new Error("Catégorie non trouvée");
    }

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Créer l'article
    const article = new Article();
    article.name = name;
    article.description = description;
    article.categorie = categorie;
    article.user = user;

    return this.articleRepository.save(article);
  }

  // Récupérer tous les articles
  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ["categorie", "user"] });
  }

  // Récupérer un article par son ID
  async getArticleById(id: number): Promise<Article | null> {
    return this.articleRepository.findOne({
      where: { id },
      relations: ["categorie", "user"],
    });
  }

  // Supprimer un article
  async deleteArticle(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (result.affected === 0) {
      throw new Error("L'article avec cet ID n'existe pas");
    }
  }
}
