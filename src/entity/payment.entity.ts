import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  paymentID: number;

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
