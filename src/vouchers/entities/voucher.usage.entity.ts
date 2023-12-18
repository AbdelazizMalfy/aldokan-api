import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from '../../orders/entities/order.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { VoucherEntity } from './voucher.entity';

@Entity()
export class VoucherUsageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VoucherEntity)
  voucher: VoucherEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => OrderEntity)
  order: OrderEntity;

  @Column()
  dateUsed: Date;
}
