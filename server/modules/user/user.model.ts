import { FindOptions } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email?: string;
  isActive: boolean;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export default class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare email?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean;

  // Additional methods or virtuals can be added here

  static async findByUsername(username: string): Promise<User | null> {
    return this.findOne({ where: { username } });
  }

  static async createUser(userData: UserCreationAttributes): Promise<User> {
    return this.create(userData);
  }

  static async findAllUsers(options?: FindOptions): Promise<User[]> {
    return this.findAll(options);
  }
}
