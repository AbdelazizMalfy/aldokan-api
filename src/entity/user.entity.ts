import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  avatar: string; // URL or path to the avatar image

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
