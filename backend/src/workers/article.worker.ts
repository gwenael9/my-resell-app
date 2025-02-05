import { RabbitMQ } from "../lib/rabbitmq";
import { Article } from "../models/article";
import { ArticleServiceHistory } from "../services/article_history.service";

export type Message = {
  action: string;
  changes: Article;
};

const articleHistoryService = new ArticleServiceHistory();

async function startWorker() {
  await RabbitMQ.connect();

  await RabbitMQ.consumeFromExchange(
    "history_queue",
    async (message: Message) => {
      console.log("🔄 Traitement de la history_queue :", message);

      switch (message.action) {
        case "UPDATE_ARTICLE":
          console.log(
            `📝 Enregistrement de l'historique pour la mise à jour de l'article ${message.changes.id}`
          );
          await articleHistoryService.createArticle(
            message.changes.id,
            message.changes.title,
            JSON.stringify({
              action: "Article mis à jour",
              changes: message.changes,
            })
          );
          console.log("✅ Modification enregistrée !");
          break;

        case "CREATE_ARTICLE":
          console.log(
            `📝 Enregistrement de l'historique pour la mise à jour de l'article ${message.changes.id}`
          );
          await articleHistoryService.createArticle(
            message.changes.id,
            message.changes.title,
            JSON.stringify({
              action: "Article mis à jour",
              changes: message.changes,
            })
          );
          console.log("✅ Modification enregistrée !");
          break;

        default:
          console.log("⚠️ Action non reconnue :", message.action);
      }
    }
  );
}

startWorker().catch(console.error);
