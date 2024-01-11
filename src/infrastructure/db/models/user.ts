import { DataTypes } from 'sequelize';
import { Column, Table, Model, AllowNull } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

@Table({
  timestamps: true,
  tableName: 'user_tbl',
  modelName: 'User',
})
class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataTypes.STRING,
  })
  declare email: string;

  @Column({
    type: DataTypes.STRING,
  })
  declare username: string;

  @Column({
    type: DataTypes.STRING,
  })
  declare password: string;

  public static async encryptPassword(password: string): Promise<string> {
    const salt = 10;
    return bcrypt.hash(password, salt);
  }

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
