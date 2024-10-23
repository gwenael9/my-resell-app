import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article";
import { User } from "./user";

// Entité Facture (ou Commande)
@Entity()
export class Facture {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.factures)
  user: User;

  @ManyToMany(() => Article)
  @JoinTable()
  articles: Article[];

  @Column()
  totalPrice: number;

  @Column()
  createdAt: Date;
}

export class InputCreateFacture {
  userId: string;
  articles: Article[];
  totalPrice: number;
}