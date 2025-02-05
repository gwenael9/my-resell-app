import { RabbitMQ } from "../lib/rabbitmq";
import { Article } from "../models/article";
import { ArticleServiceHistory } from "../services/article_history.service";

export type Message = {
  action?: string;
  timestamp?: string;
  changes?: Article;
  message?: string;
};

const articleHistoryService = new ArticleServiceHistory();

async function startWorker() {
  await RabbitMQ.connect();
  await RabbitMQ.consumeLogs(); // Consommer les logs

  await RabbitMQ.consumeFromExchange(
    "history_queue",
    async (message: Message) => {
      console.log("🔄 Traitement de la history_queue :", message);

      switch (message.action) {
        case "UPDATE_ARTICLE":
          console.log(
            `📝 Enregistrement de l'historique pour la mise à jour de l'article ${message.changes?.id}`
          );
          await articleHistoryService.createArticle(
            message.changes?.id ?? 0,
            message.changes?.title ?? "",
            message.changes
          );
          console.log("✅ Modification enregistrée !");
          await RabbitMQ.publishLog(
            `Article mis à jour: ${message.changes?.id}`
          );
          break;

        case "CREATE_ARTICLE":
          console.log(
            `📝 Enregistrement de l'historique pour la création de l'article ${message.changes?.id}`
          );
          await articleHistoryService.createArticle(
            message.changes?.id ?? 0,
            message.changes?.title ?? "",
            message.changes
          );
          console.log("✅ Création enregistrée !");
          await RabbitMQ.publishLog(`Article créé: ${message.changes?.id}`);
          break;

        default:
          console.log("⚠️ Action non reconnue :", message.action);
      }
    }
  );
}

startWorker().catch(console.error);
