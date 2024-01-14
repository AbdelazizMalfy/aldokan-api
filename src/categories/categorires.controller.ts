import { CategoryEntity } from 'src/categories/entities/category.entity';
import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/categorires.service';
import { CreateCategoryDto } from './dto/create.category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<CategoryEntity[]> {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  async getCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryEntity> {
    const category = await this.categoriesService.getCategoryById(id);

    console.log('category');
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    return category;
  }

  //   @Get('/category/:id')
  //   getProductsByCategory(
  //     @Param('id') categoryId: number,
  //   ): Promise<ProductEntity[]> {
  //     return this.productsService.getProductsByCategory(categoryId);
  //   }

  @Post()
  async addCategory(
    @Body() category: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoriesService.createCategory(category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const category = await this.categoriesService.getCategoryById(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found.`);
    }

    return await this.categoriesService.remove(category);
  }
}
