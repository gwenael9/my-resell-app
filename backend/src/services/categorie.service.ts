import db from "../lib/datasource";
import { Categorie } from "../models/categorie";

export class CategorieService {
  private categorieRepository;

  constructor() {
    this.categorieRepository = db.getRepository(Categorie);
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
    // mettre la 1e lettre en majuscule et le reste en minuscule
    const formattedName =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    console.log("Formatted name:", formattedName);

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
}
