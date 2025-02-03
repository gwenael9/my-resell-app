import { RabbitMQ } from "../lib/rabbitmq";
import { ArticleServiceHistory } from "../services/article_history.service";

type Message = {
  articleId: number;
  action: string;
  title: string;
  changes: any;
};

const articleHistoryService = new ArticleServiceHistory();

async function startWorker() {
  await RabbitMQ.connect();

  await RabbitMQ.consumeFromQueue("article_queue", async (message: Message) => {
    console.log("🔄 Traitement de l'article :", message);

    if (message.action === "ARTICLE_UPDATED") {
      console.log(
        `📝 Enregistrement de l'historique pour l'article ${message.articleId}`
      );

      await articleHistoryService.createArticle(
        message.articleId,
        message.title,
        JSON.stringify(message.changes)
      );

      console.log("✅ Modification enregistrée !");
    }
  });
}

startWorker().catch(console.error);
