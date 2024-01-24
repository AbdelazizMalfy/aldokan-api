import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { ProductInCartEntity } from './entities/product.in.cart.entity';
import { ProductsService } from 'src/products/products.service';
import { ProductEntity } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, ProductInCartEntity, ProductEntity]),
  ],
  providers: [CartService, ProductsService],
  controllers: [CartController],
})
export class CartModule {}
