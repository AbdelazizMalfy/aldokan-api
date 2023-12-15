import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: number): Promise<CategoryEntity | undefined> {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  //   async getProductsByCategory(categoryId: number): Promise<ProductEntity[]> {
  //     return this.productRepository.find({
  //       where: {
  //         category: { id: categoryId },
  //       },
  //       relations: ['category'],
  //     });
  //   }

  async createCategory(
    entity: Partial<CategoryEntity>,
  ): Promise<CategoryEntity> {
    const category = this.categoryRepository.create(entity);
    return this.categoryRepository.save(category);
  }

  async remove(entity: CategoryEntity): Promise<string> {
    // this.logger.info(
    //   {
    //     product: entity.id,
    //   },
    //   'delete deleted',
    // );

    await this.categoryRepository.remove(entity);
    return `Category ${entity.name} Deleted Successfully`;
  }
}
