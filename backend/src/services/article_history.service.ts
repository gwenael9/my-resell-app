import db from "../lib/datasource";
import { History } from "../models/articleHistory";

export class ArticleServiceHistory {
  private articleHistoryRepository;

  constructor() {
    if (!db.isInitialized) {
      db.initialize()
        .then(() => console.log("✅ Base de données initialisée pour History"))
        .catch((err) => console.error("❌ Erreur d'initialisation :", err));
    }
    this.articleHistoryRepository = db.getRepository(History);
  }

  async createArticle(article_id: number, title: string, modification: string) {
    console.log("On passe ou pas ?????");
    const article = this.articleHistoryRepository.create({
      article_id,
      title,
      modification,
    });

    console.log("On passe 2 ?");

    await this.articleHistoryRepository.save(article);
  }
}