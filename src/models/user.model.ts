import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association } from 'sequelize';

import { IUser, IUserModel } from '../interfaces/user.interface';
import { Message } from './';
import db from '../db'; 


class User extends Model<IUser, IUserModel>
  implements IUser {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getMessages!: HasManyGetAssociationsMixin<Message>;
  public addMessage!: HasManyAddAssociationMixin<Message, number>;
  public hasMessage!: HasManyHasAssociationMixin<Message, number>;
  public countMessages!: HasManyCountAssociationsMixin;
  public createMessage!: HasManyCreateAssociationMixin<Message>;

  public readonly messages?: Message[];
  public static associations: {
    messages: Association<User, Message>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
      validate: {
        min: 3
      }
    },
    email: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        min: 8
      }
    }
  },
  {
    tableName: 'users',
    sequelize: db,
    modelName: 'User',
  }
);

export { User };
