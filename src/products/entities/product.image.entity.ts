import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class ProductImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string; // URL or path to the image

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
