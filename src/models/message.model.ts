import { 
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable } from 'typeorm';
import { Min } from 'class-validator';
import { User } from './user.model';


@Entity()
export class Message {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.messages, {
    eager: true
  })
  @JoinTable()
  user: User;

  @Column({
    nullable: false
  })
  userId: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  @Min(2)
  msg: string;
}
