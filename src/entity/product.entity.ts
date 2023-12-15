import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductImageEntity } from './product.image.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  productID: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => ProductImageEntity, (productImage) => productImage.product)
  images: ProductImageEntity[];

  @Column('decimal')
  price: number;

  @Column('int')
  stockQuantity: number;

  @Column()
  unitType: string;

  @Column({ nullable: true })
  weightPerUnit: string;
}
