import {Table, Column, Model, HasMany} from 'sequelize-typescript';
 
@Table
class Wallet extends Model {
 
  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  birthday?: Date;

  @BelongsToMany(() => Movie, () => MovieActor)
  movies?: Movie[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}