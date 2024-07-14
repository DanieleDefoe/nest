import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'user-roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
