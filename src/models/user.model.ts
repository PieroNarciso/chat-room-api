import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, Min, IsAlphanumeric } from 'class-validator';
import { Message } from './message.model';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    unique: true,
  })
  @IsAlphanumeric()
  username: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
  })
  @Min(8)
  password: string;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];
}
