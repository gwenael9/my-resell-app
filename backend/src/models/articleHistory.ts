import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article";

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  article_id: number;

  @Column()
  title: string;

  @Column()
  modification: Article;

  @CreateDateColumn()
  updatedAt: Date;
}

export class InputCreateArticleHistory {
  articleId: number;
  title: string;
  modification: string;
}