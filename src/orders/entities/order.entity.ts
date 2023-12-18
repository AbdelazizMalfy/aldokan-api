import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderDetailsEntity } from './order.details.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column()
  orderDate: Date;

  @Column()
  status:
    | 'pending'
    | 'processing'
    | 'Confirmed'
    | 'shipped'
    | 'delivered'
    | 'returned'
    | 'refunded'
    | 'cancelled';

  @OneToMany(() => OrderDetailsEntity, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetailsEntity[];
}
