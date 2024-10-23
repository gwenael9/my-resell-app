import { Like } from "../models/like";
import { User } from "../models/user";
import { Article } from "../models/article";
import db from "../lib/datasource";
import { UserService } from "./user.service";
import { ArticleService } from "./article.service";

const userService = new UserService();
const articleService = new ArticleService();

export class LikeService {
  private likeRepository;

  constructor() {
    this.likeRepository = db.getRepository(Like);
  }

  async likeArticle(userId: string, articleId: number): Promise<Like> {
    const user = await userService.findUserById(userId);
    const article = await articleService.getArticleById(articleId);

    // on vérifie si l'article n'est pas déjà liké par l'user
    const existingLike = await this.likeRepository.findOne({
      where: { user: { id: user.id }, article: { id: article.id } },
    });

    // si oui, on renvoie une erreur
    if (existingLike) {
      throw new Error("L'article est déjà liké !");
    }

    // on créé le like
    const like = this.likeRepository.create({
      user: { id: userId },
      article: { id: articleId },
    });

    // on incrémente le compteur de like
    await articleService.modifyCountLike(article.id, "like");

    return await this.likeRepository.save(like);
  }

  async unlikeArticle(userId: string, articleId: number) {
    const user = await userService.findUserById(userId);
    const article = await articleService.getArticleById(articleId);

    const existingLike = await this.likeRepository.findOne({
      where: { user: { id: user.id }, article: { id: article.id } },
    });
    if (!existingLike) {
      throw new Error("L'article n'est pas liké.");
    }

    // on décrémente le compteur de like
    await articleService.modifyCountLike(article.id, "dislike");

    return await this.likeRepository.delete(existingLike.id);
  }

  async getLikedArticles(userId: string): Promise<Article[]> {
    const likes = await this.likeRepository.find({
      where: { user: { id: userId } },
      relations: ["article"],
    });
    return likes.map((like) => like.article);
  }
}
