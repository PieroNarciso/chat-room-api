import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association } from 'sequelize';

import { User } from '../models';
import { IMessage, IMessageModel } from '../interfaces/message.interface';
import db from '../db';


class Message extends Model<IMessage, IMessageModel>
  implements IMessage {
  public id!: number;
  public userId!: number;
  public content!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: BelongsToGetAssociationMixin<User>;

  public static associations: {
    User: Association<User, Message>;
  };
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.STRING(4096),
      allowNull: false
    }
  },
  {
    tableName: 'messages',
    sequelize: db,
    modelName: 'Message'
  }
);


User.hasMany(Message, { foreignKey: 'userId', as: 'messages' });
Message.belongsTo(User, { targetKey: 'userId', as: 'user' });

Message.addScope('includeUser', {
  include: [{
    model: User
  }]
});

export { Message };
