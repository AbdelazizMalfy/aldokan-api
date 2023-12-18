import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class VoucherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column('decimal')
  discountValue: number;

  @Column()
  discountType: string;

  @Column('decimal')
  minPurchaseAmount: number;

  @Column('int')
  usageLimit: number;

  @Column()
  validFrom: Date;

  @Column()
  validTo: Date;

  @Column()
  isActive: boolean;
}
