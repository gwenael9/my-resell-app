import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./lib/datasource"; // Assurez-vous que ce chemin est correct
import authRoutes from './routes/auth.routes'; // Importez vos routes ici

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Initialiser la base de données
db.initialize()
  .then(() => {
    console.log("Connexion à la base de données réussie.");

    // Utilisation des routes
    app.use(authRoutes); // Assurez-vous d'utiliser vos routes

    console.log(authRoutes);

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données:", error);
  });
