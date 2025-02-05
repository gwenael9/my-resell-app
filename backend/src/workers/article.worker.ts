import { RabbitMQ } from "../lib/rabbitmq";
import { Article } from "../models/article";
import { ArticleServiceHistory } from "../services/article_history.service";
import db from "../lib/datasource"; // Importation de la base de données

export type Message = {
  action?: string;
  timestamp?: string;
  changes?: Article;
  message?: string;
};

const articleHistoryService = new ArticleServiceHistory();

async function startWorker() {
  try {
    // Initialisation de la base de données
    if (!db.isInitialized) {
      await db.initialize();
      console.log("✅ Base de données initialisée dans le Worker");
    }

    await RabbitMQ.connect();
    console.log("✅ Connexion à RabbitMQ établie");

    await RabbitMQ.consumeLogs();

    await RabbitMQ.consumeFromExchange("history_queue", async (message: Message) => {
      console.log("🔄 Traitement de la history_queue :", message);

      switch (message.action) {
        case "UPDATE_ARTICLE":
          console.log(
            `📝 Enregistrement de l'historique pour la mise à jour de l'article ${message.changes?.id}`
          );
          await articleHistoryService.createArticle(
            message.changes?.id ?? 0,
            message.changes?.title ?? "",
            JSON.stringify({
              action: "Article mis à jour",
              changes: message.changes,
            })
          );
          console.log("✅ Modification enregistrée !");
          await RabbitMQ.publishLog(`Article mis à jour: ${message.changes?.id}`);
          break;

        case "CREATE_ARTICLE":
          console.log(
            `📝 Enregistrement de l'historique pour la création de l'article ${message.changes?.id}`
          );
          await articleHistoryService.createArticle(
            message.changes?.id ?? 0,
            message.changes?.title ?? "",
            JSON.stringify({
              action: "Article créé",
              changes: message.changes,
            })
          );
          console.log("✅ Création enregistrée !");
          await RabbitMQ.publishLog(`Article créé: ${message.changes?.id}`);
          break;

        default:
          console.log("⚠️ Action non reconnue :", message.action);
      }
    });
  } catch (error) {
    console.error("❌ Erreur dans le Worker :", error);
  }
}

startWorker().catch(console.error);
