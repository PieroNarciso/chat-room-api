import { Optional } from 'sequelize';


export interface IMessage {
  id: number;
  userId: number;
  content: string;
}

export type IMessageModel = Optional<IMessage, 'id'>;
