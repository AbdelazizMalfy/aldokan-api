import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column('text', { nullable: true })
  address: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';

  @Column('text', { nullable: true })
  avatar: string | null;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity;
}
