import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";

@Index("skill_pkey", ["id"], { unique: true })
@Entity("skill", { schema: "public" })
export class Skill {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "title" })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("boolean", {
    name: "countable",
    nullable: true,
    default: () => "true",
  })
  countable: boolean | null;

  @Column("real", { name: "goal", precision: 24, default: () => "0" })
  goal: number;

  @Column("integer", {
    name: "entity_equipped",
    nullable: true,
    default: () => "0",
  })
  entityEquipped: number | null;

  @Column("text", { name: "color", nullable: true, default: () => "'#000000'" })
  color: string | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @OneToMany(() => Task, (task) => task.idSkill)
  tasks: Task[];

  @OneToMany(() => Task, (task) => task.idSkill2)
  tasks2: Task[];

  @OneToMany(() => Task, (task) => task.idSkill3)
  tasks3: Task[];
}
