import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Categorie } from "./categorie";
import { Like } from "./like";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  size: string;

  @Column()
  price: number;

  @Column()
  etat: string;

  @ManyToOne(() => Categorie, (categorie) => categorie.articles)
  categorie: Categorie;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @OneToMany(() => Like, (like) => like.article)
  likes: Like[];

  @Column({ default: 0 })
  likesCount: number;

  @Column()
  createdAt: Date;
  
  @Column()
  updateAt: Date;
}

export class InputCreateArticle {
  title: string;
  description: string;
  size: string;
  price: number;
  etat: string;
  categorieId: number;
  userId: string;

}
