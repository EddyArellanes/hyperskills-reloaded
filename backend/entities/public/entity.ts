import {
	Model, Table, Column, DataType, Index, ForeignKey 
} from "sequelize-typescript";

@Table({
	tableName: "entity",
	timestamps: false 
})
export class entity extends Model<entity> {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "entity_pkey",
    	using: "btree",
    	unique: true 
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
    	type: DataType.STRING 
    })
    image?: string;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT 
    })
    goal?: number;

    @Column({
    	field: "created_at",
    	allowNull: true,
    	type: DataType.STRING 
    })
    createdAt?: string;

    @Column({
    	field: "updated_at",
    	allowNull: true,
    	type: DataType.DATE(6) 
    })
    updatedAt?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.BOOLEAN 
    })
    completed?: boolean;

    @Column({
    	allowNull: true,
    	type: DataType.FLOAT 
    })
    current?: number;

}