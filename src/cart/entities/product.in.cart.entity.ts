import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from 'src/products/entities/product.entity';

@Entity()
export class ProductInCartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;

  @Column()
  quantity: number;

  @ManyToOne(() => CartEntity, (cart) => cart.products)
  cart: CartEntity;
}
