import {
	Model, Table, Column, DataType, Index, ForeignKey 
} from "sequelize-typescript";

@Table({
	tableName: "task",
	timestamps: false 
})
export class task extends Model<task> {

    @Column({
    	autoIncrement: true,
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    id?: number;

    @Column({
    	field: "id_skill",
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    idSkill?: number;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT,
    	comment: "If the Skill is Countable, then current is the number done, example 8/20 is current/skill.goal" 
    })
    current?: number;

    @Column({
    	field: "completed_rate",
    	allowNull: true,
    	type: DataType.FLOAT 
    })
    completedRate?: number;

    @Column({
    	allowNull: true,
    	type: DataType.BOOLEAN 
    })
    completed?: boolean;

    @Column({
    	field: "_date",
    	allowNull: true,
    	type: DataType.STRING 
    })
    date?: string;

    @Column({
    	field: "id_entity",
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    idEntity?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING 
    })
    note?: string;

}