import { Panier } from "../models/panier";
import db from "../lib/datasource";
import { UserService } from "./user.service";
import { ArticleService } from "./article.service";
import { FactureService } from "./facture.service";

const userService = new UserService();
const articleService = new ArticleService();
const factureService = new FactureService();

export class PanierService {
  private panierRepository;

  constructor() {
    this.panierRepository = db.getRepository(Panier);
  }

  // récupérer le panier d'un utilisateur
  async getUserPanier(userId: string): Promise<Panier> {
    // vérifie si un panier non validé existe déjà
    let panier = await this.panierRepository.findOne({
      where: { user: { id: userId } },
      relations: ["articles", "articles.user"],
      select: {
        articles: {
          id: true,
          user: { username: true },
          title: true,
          size: true,
          price: true,
        },
      },
    });

    // si aucun panier, on en crée un
    if (!panier) {
      const user = await userService.findUserById(userId);
      if (!user) {
        throw new Error("Utilisateur introuvable.");
      }

      // créer un nouveau panier
      panier = this.panierRepository.create({
        user,
        articles: [],
        totalPrice: 0,
        isValidated: false,
        createdAt: new Date(),
      });

      // sauvegarde du nouveau panier
      panier = await this.panierRepository.save(panier);
    }

    return panier;
  }

  // ajouter un article au panier
  async addArticleToPanier(userId: string, articleId: number): Promise<string> {
    const user = await userService.findUserById(userId);
    const article = await articleService.getArticleById(articleId);

    if (!user || !article) {
      throw new Error("Utilisateur ou article introuvable.");
    }

    // récupérer le panier de l'utilisateur (si non validé)
    const panier = await this.getUserPanier(userId);

    if (userId === article.user.id) {
      throw new Error("Vous ne pouvez pas ajouter votre propre article");
    }

    // si l'article est déjà dans le panier
    if (panier.articles.some((a) => a.id === article.id)) {
      throw new Error("L'article est déjà dans le panier.");
    }

    // ajouter l'article au panier
    panier.articles.push(article);

    // cumule le prix du panier avec le nouvel article
    panier.totalPrice = panier.totalPrice + article.price;

    const test = await this.panierRepository.save(panier);
    console.log(test);

    const message = "L'article a bien été ajouté au panier.";
    return message;
  }

  // supprimer un article du panier
  async removeArticleFromPanier(
    userId: string,
    articleId: number
  ): Promise<string> {
    const panier = await this.getUserPanier(userId);

    // cherche dans le panier l'article à supprimer (nous renvoie l'index si on le trouve sinon -1)
    const articleIndex = panier.articles.findIndex((a) => a.id === articleId);

    // on vérifie si l'article est dans le panier
    if (articleIndex === -1) {
      throw new Error("L'article n'est pas dans le panier.");
    }

    // l'article à supprimer
    const article = panier.articles[articleIndex];

    // supprimer l'article du panier
    panier.articles.splice(articleIndex, 1);
    // met à jour le prix du panier
    panier.totalPrice = panier.totalPrice - article.price;

    // enregistrement du panier
    await this.panierRepository.save(panier);

    // on renvoie un message
    const message = "L'article a bien été supprimé du panier.";
    return message;
  }

  // valider un panier
  async validatePanier(userId: string) {
    const panier = await this.getUserPanier(userId);

    if (panier.articles.length === 0) {
      throw new Error("Le panier est vide. Impossible de valider.");
    }

    // valide le panier
    panier.isValidated = true;

    // créer une facture
    const facture = await factureService.createFacture({
      userId,
      articles: panier.articles,
      totalPrice: panier.totalPrice,
    });

    // supprimer le panier après validation
    await this.panierRepository.delete(panier.id);

    return facture;
  }
}
