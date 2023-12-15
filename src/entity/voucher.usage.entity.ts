import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';
import { VoucherEntity } from './voucher.entity';

@Entity()
export class VoucherUsageEntity {
  @PrimaryGeneratedColumn()
  voucherUsageID: number;

  @ManyToOne(() => VoucherEntity)
  voucher: VoucherEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => OrderEntity)
  order: OrderEntity;

  @Column()
  dateUsed: Date;
}
