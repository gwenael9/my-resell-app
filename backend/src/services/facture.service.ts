import db from "../lib/datasource";
import { Facture, InputCreateFacture } from "../models/facture";
import { UserService } from "./user.service";

const userService = new UserService();

export class FactureService {
  private factureRepository;

  constructor() {
    this.factureRepository = db.getRepository(Facture);
  }

  // récupérer toutes les factures d'un user, pour l'article on renvoie seulement le titre et le nom du créateur
  async getAllFactures(id: string): Promise<Facture[]> {
    const factures = await this.factureRepository.find({
      where: { user: { id } },
      relations: ["articles", "articles.user"],
      select: {
        articles: {
          title: true,
          user: { username: true },
        },
      },
    });
    return factures.reverse();
  }

  // récupérer une facture selon son id
  async getFactureById(userId: string, factureId: number): Promise<Facture> {
    const facture = await this.factureRepository.findOne({
      where: { id: factureId },
      relations: ["user", "articles"],
      select: {
        user: { id: true, email: true, city: true, adresse: true, cp: true },
        articles: { title: true, id: true, price: true },
      },
    });

    // si la facture n'existe pas
    if (!facture) {
      throw new Error("Facture introuvable.");
    }

    // si la facture n'a pas été créée par l'user connecté
    if (facture.user.id !== userId) {
      throw new Error("Cette facture ne vous appartient pas!");
    }

    return facture;
  }

  // créer une facture
  async createFacture({
    userId,
    articles,
    totalPrice,
    taxe,
    totalPriceTaxe,
  }: InputCreateFacture) {
    const user = await userService.findUserById(userId);

    // création de la facture
    const facture = this.factureRepository.create({
      user,
      articles,
      totalPrice,
      taxe,
      totalPriceTaxe,
      createdAt: new Date(),
    });

    // sauvegarde de la facture
    const saveFacture = await this.factureRepository.save(facture);

    // on retourne la facture
    return await this.getFactureById(userId, saveFacture.id);
  }
}
