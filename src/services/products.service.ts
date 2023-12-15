import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entity/category.entity';
import { ProductEntity } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<ProductEntity | undefined> {
    return this.productRepository.findOneByOrFail({ id });
  }

  async getProductsByCategory(categoryId: number): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: {
        category: { id: categoryId },
      },
      relations: ['category'],
    });
  }

  async createProduct(
    entity: Partial<ProductEntity>,
    category: Partial<CategoryEntity>,
  ): Promise<ProductEntity> {
    const product = this.productRepository.create({
      ...entity,
      category,
    });
    return this.productRepository.save(product);
  }

  async updateProduct(entity: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.save(entity);
  }

  async remove(entity: ProductEntity): Promise<string> {
    // this.logger.info(
    //   {
    //     product: entity.id,
    //   },
    //   'delete deleted',
    // );

    await this.productRepository.remove(entity);
    return 'Product Deleted Successfully';
  }
}
