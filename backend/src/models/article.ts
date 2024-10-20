import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Categorie } from "./categorie";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Categorie, (categorie) => categorie.articles)
  categorie: Categorie;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;
}
