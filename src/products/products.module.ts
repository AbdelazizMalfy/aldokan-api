import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';
import { ProductImageEntity } from './entities/product.image.entity';
import { CategoriesModule } from 'src/categories/categorires.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductImageEntity]),
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Export if you want to use the service in other modules
})
export class ProductsModule {}
