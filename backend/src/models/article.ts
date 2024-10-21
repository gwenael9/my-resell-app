import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Categorie } from "./categorie";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Categorie, (categorie) => categorie.articles)
  categorie: Categorie;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @Column()
  createdAt: Date;
}

export class InputCreateArticle {
  title: string;

  content: string;

  categorieId: number;

  userId: string;
}
