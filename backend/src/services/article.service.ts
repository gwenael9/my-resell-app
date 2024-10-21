import { UserService } from './user.service';
import db from "../lib/datasource";
import { Article, InputCreateArticle } from "../models/article";
import { CategorieService } from './categorie.service';

export class ArticleService {
  private articleRepository;

  constructor() {
    this.articleRepository = db.getRepository(Article);
  }

  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepository.find({
      relations: ["user", "categorie"],
    })
  }
  
  async getArticlesByUser(userId: string): Promise<Article[]> {
    return await this.articleRepository.find({
      where: { user: { id: userId }},
      relations: ["user", "categorie"],
    })
  }

  async createArticle({ title, content, categorieId, userId}: InputCreateArticle) {
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

    const createdAt = new Date();

    const article = this.articleRepository.create({
      title, content, categorie, user, createdAt
    })

    return await this.articleRepository.save(article);
  }

}
