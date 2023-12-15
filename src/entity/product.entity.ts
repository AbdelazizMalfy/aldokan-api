import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ProductImageEntity } from './product.image.entity';
import { CategoryEntity } from './category.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'categoryId' }) // This adds a categoryId column to the Product table
  category: CategoryEntity;
}
