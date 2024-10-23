import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Article } from "./article";
import { Like } from "./like";
import { Panier } from "./panier";
import { Facture } from "./facture";

export type ROLE = "ADMIN" | "USER";

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "text",
    enum: ["ADMIN", "USER"],
    nullable: true,
    default: "USER",
  })
  role: ROLE;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
  
  @OneToMany(() => Panier, (panier) => panier.user)
  paniers: Panier[];
  
  @OneToMany(() => Facture, (facture) => facture.user)
  factures: Facture[];
}

export class UserProfile {
  email: string;
}

export class InputRegister {
  email: string;

  username: string;

  password: string;

  role?: ROLE;
}

export class InputLogin {
  email: string;

  password: string;
}