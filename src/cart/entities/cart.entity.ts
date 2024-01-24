import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ProductInCartEntity } from './product.in.cart.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => ProductInCartEntity, (productInCart) => productInCart.cart, {
    cascade: true,
  })
  products: ProductInCartEntity[];
}
