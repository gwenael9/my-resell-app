import db from "../lib/datasource";
import { Categorie } from "../models/categorie";

export class CategorieService {
  private categorieRepository;

  constructor() {
    this.categorieRepository = db.getRepository(Categorie);
  }

  private async formatNameCategorie(name: string) {
    const lettersRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (name.length < 3) {
      throw new Error(
        "Le nom de la catégorie doit faire au moins 3 caractères."
      );
    }

    if (!lettersRegex.test(name)) {
      throw new Error(
        "Le nom de la catégorie ne doit contenir que des lettres."
      );
    }

    // mettre la 1ère lettre en majuscule et le reste en minuscule
    const formattedName =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    return formattedName;
  }

  async findCategorieById(id: number) {
    return await this.categorieRepository.findOne({ where: { id } });
  }

  async findCategorieByName(name: string) {
    return await this.categorieRepository.findOne({ where: { name } });
  }

  async getAllCategorie(): Promise<Categorie[]> {
    return await this.categorieRepository.find();
  }

  async createCategorie(name: string) {
    // on vérifie que le nom est au bon format
    const formattedName = await this.formatNameCategorie(name);

    // on vérifie si la catégorie existe déjà ou non
    const categorie = await this.findCategorieByName(formattedName);
    if (categorie) {
      throw new Error(`La catégorie "${formattedName}" existe déjà.`);
    }

    // on créé la catégorie
    const newCategorie = this.categorieRepository.create({
      name: formattedName,
    });
    return await this.categorieRepository.save(newCategorie);
  }

  async deleteCategorie(id: number) {
    // on vérifie si la catégorie existe
    const categorie = await this.findCategorieById(id);
    if (!categorie) {
      throw new Error("La catégorie n'existe pas !");
    }

    return await this.categorieRepository.delete(id);
  }

  async updateCategorie(id: number, newName: string) {
    // on vérifie si la catégorie existe
    const categorie = await this.findCategorieById(id);
    if (!categorie) {
      throw new Error("La catégorie à modifier n'existe pas !");
    }

    // on vérifie que le nom est au bon format
    const formattedName = await this.formatNameCategorie(newName);

    // on vérifie si une autre catégorie avec le même nom existe
    const existingCategorie = await this.findCategorieByName(formattedName);

    if (existingCategorie && existingCategorie.id !== id) {
      throw new Error(`La catégorie "${formattedName}" existe déjà.`);
    }

    // Mettre à jour le nom de la catégorie
    categorie.name = formattedName;

    // Enregistrer les modifications
    return await this.categorieRepository.save(categorie);
  }
}
