import {
	Model, Table, Column, DataType, Index, ForeignKey 
} from "sequelize-typescript";

@Table({
	tableName: "skill",
	timestamps: false 
})
export class skill extends Model<skill> {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "skill_pkey",
    	using: "btree",
    	unique: true 
    })
    id?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING 
    })
    title?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING 
    })
    description?: string;

    @Column({
    	allowNull: true,
    	type: DataType.BOOLEAN 
    })
    countable?: boolean;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT 
    })
    goal?: number;

    @Column({
    	field: "entity_equipped",
    	allowNull: true,
    	type: DataType.INTEGER,
    	comment: "Suddenly the Skills are relative Infinite, the Entities can be Projects with an end, for that when are completed mark as true" 
    })
    entityEquipped?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING,
    	comment: "Color in Hex of that represent the Skill" 
    })
    color?: string;

    @Column({
    	field: "updated_at",
    	allowNull: true,
    	type: DataType.DATE(6) 
    })
    updatedAt?: Date;

    @Column({
    	field: "created_at",
    	allowNull: true,
    	type: DataType.DATE(6) 
    })
    createdAt?: Date;

}