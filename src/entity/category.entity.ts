import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Relation with Product
  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
