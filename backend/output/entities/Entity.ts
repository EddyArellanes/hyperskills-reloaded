import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("entity_pkey", ["id"], { unique: true })
@Entity("entity", { schema: "public" })
export class Entity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "id_skill" })
  idSkill: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("text", { name: "image", nullable: true })
  image: string | null;

  @Column("real", { name: "goal", nullable: true, precision: 24 })
  goal: number | null;

  @Column("date", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: string | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @Column("boolean", {
    name: "completed",
    nullable: true,
    default: () => "false",
  })
  completed: boolean | null;

  @Column("real", {
    name: "current",
    nullable: true,
    precision: 24,
    default: () => "0",
  })
  current: number | null;
}
