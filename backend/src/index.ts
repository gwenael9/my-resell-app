import express from "express";
import cors from "cors";
import db from "./lib/datasource";
import * as dotenv from "dotenv";
import { authMiddleware } from "./lib/auth.middleware";
import router from "./routes";
import KafkaService from "./services/kafka.service";
import { TOPICS } from "./kafka/kafka.config";
import AnalyticsConsumer from "./consumers/analytics.consumer";

dotenv.config();

export interface Payload {
  email: string;
}

const app = express();
const PORT = 4000;

app.use(
  "/",
  cors<cors.CorsRequest>({
    origin: "http://localhost:8080",
    credentials: true,
  }),
  express.json()
);

// middleware global pour authentification
app.use(authMiddleware);

// initialiser la base de données
db.initialize()
  .then(async () => {
    // Initialiser Kafka
    const kafkaService = KafkaService.getInstance();
    try {
      await kafkaService.initialize();
      console.log("Kafka producer initialized successfully");

      await kafkaService.initializeConsumer();
      console.log("Kafka consumer initialized successfully");

      await kafkaService.subscribeToTopics(Object.values(TOPICS));
      console.log("Subscribed to all topics");

      // Démarrer le consommateur d'analytics
      const analyticsConsumer = AnalyticsConsumer.getInstance();
      await analyticsConsumer.start();

      app.use(router);

      app.listen(PORT, () => {
        console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
      });

      // Gérer l'arrêt propre de l'application
      process.on("SIGINT", async () => {
        console.log("Arrêt de l'application...");
        await analyticsConsumer.stop();
        process.exit(0);
      });
    } catch (error) {
      console.error("Erreur lors de l'initialisation de Kafka:", error);
    }
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données:", error);
  });
