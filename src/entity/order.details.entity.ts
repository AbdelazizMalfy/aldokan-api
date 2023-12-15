import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class OrderDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;
}
