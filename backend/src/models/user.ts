import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Article } from "./article";
import * as argon2 from "argon2";

export type ROLE = "ADMIN" | "USER";

@Entity()
export class User {
  @BeforeInsert()
  protected async hashPassword() {
    if (!this.password.startsWith("$argon2")) {
      this.password = await argon2.hash(this.password);
    }
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
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