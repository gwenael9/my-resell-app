import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./article";
import { User } from "./user";

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

  @Column("decimal", { precision: 10, scale: 2 })
  taxe: number;

  @Column("decimal", { precision: 10, scale: 2 })
  totalPriceTaxe: number;
}

export class InputCreateFacture {
  userId: string;
  articles: Article[];
  totalPrice: number;
  taxe: number;
  totalPriceTaxe: number;
}
