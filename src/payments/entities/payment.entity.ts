import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity;

  @Column('decimal')
  amount: number;

  @Column()
  paymentDate: Date;

  @Column()
  paymentMethod: string;
}
