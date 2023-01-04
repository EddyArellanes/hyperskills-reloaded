import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Skill } from "./Skill";

@Index("task_pkey", ["id"], { unique: true })
@Entity("task", { schema: "public" })
export class Task {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("real", { name: "current", nullable: true, precision: 24 })
  current: number | null;

  @Column("real", { name: "completed_rate", nullable: true, precision: 24 })
  completedRate: number | null;

  @Column("boolean", {
    name: "completed",
    nullable: true,
    default: () => "false",
  })
  completed: boolean | null;

  @Column("date", { name: "_date", nullable: true, default: () => "now()" })
  date: string | null;

  @Column("integer", { name: "id_entity", nullable: true })
  idEntity: number | null;

  @Column("text", { name: "note", nullable: true })
  note: string | null;

  @ManyToOne(() => Skill, (skill) => skill.tasks, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_skill", referencedColumnName: "id" }])
  idSkill: Skill;

  @ManyToOne(() => Skill, (skill) => skill.tasks2, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_skill", referencedColumnName: "id" }])
  idSkill2: Skill;

  @ManyToOne(() => Skill, (skill) => skill.tasks3, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_skill", referencedColumnName: "id" }])
  idSkill3: Skill;
}
