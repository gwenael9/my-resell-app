import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./lib/datasource";
import authRoutes from "./routes/auth.routes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Initialiser la base de données
db.initialize()
  .then(() => {
    console.log("Connexion à la base de données réussie.");

    app.use(authRoutes);

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données:", error);
  });
