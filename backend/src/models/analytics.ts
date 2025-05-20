import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("analytics_events")
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "type", length: 50 })
  type: string;

  @Column({ name: "user_id", length: 100 })
  userId: string;

  @Column({ name: "page_url", length: 255 })
  pageUrl: string;

  @Column({ name: "timestamp", type: "timestamp" })
  timestamp: Date;

  @Column("jsonb")
  data: Record<string, any>;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
