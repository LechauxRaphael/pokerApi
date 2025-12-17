import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Double } from 'typeorm/browser';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  money: number;
}
