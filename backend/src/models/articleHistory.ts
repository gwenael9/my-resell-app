import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('history')
export class ArticleHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  article_id: number;

  @Column()
  title: string;

  @Column("text")
  modification: string;

  @CreateDateColumn()
  updatedAt: Date;
}

export class InputCreateArticleHistory {
  articleId: number;
  title: string;
  modification: string;
}