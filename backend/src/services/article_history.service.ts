import db from "../lib/datasource";
import { Article } from "../models/article";
import { History } from "../models/articleHistory";

export class ArticleServiceHistory {
  private articleHistoryRepository;

  constructor() {
    this.articleHistoryRepository = db.getRepository(History);
  }

  async createArticle(article_id: number, title: string, modification: string) {
    const article = this.articleHistoryRepository.create({
      article_id,
      title,
      modification,
    });

    // on sauvegarde l'article
    await this.articleHistoryRepository.save(article);
  }
}
