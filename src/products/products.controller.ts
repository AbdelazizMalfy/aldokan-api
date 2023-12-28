import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/create.product.dto';
import { UpdateProductDto } from 'src/products/dto/update.product.dto';
import { ProductEntity } from 'src/products/entities/product.entity';
import { CategoriesService } from 'src/categories/categorires.service';
import { ProductsService } from 'src/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  getProducts(): Promise<ProductEntity[]> {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
    const product = await this.productsService.getProductById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return product;
  }

  @Get('/category/:id')
  getProductsByCategory(
    @Param('id') categoryId: number,
  ): Promise<ProductEntity[]> {
    return this.productsService.getProductsByCategory(categoryId);
  }

  @Post()
  async addProduct(@Body() product: CreateProductDto): Promise<ProductEntity> {
    const category = await this.categoriesService.getCategoryById(
      product.categoryId,
    );

    return this.productsService.createProduct(product, category);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.productsService.getProductById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    if (input.name !== undefined) {
      product.name = product.name;
    }

    if (input.description !== undefined) {
      product.description = input.description;
    }

    if (input.price !== undefined) {
      product.price = input.price;
    }

    if (input.stockQuantity !== undefined) {
      product.stockQuantity = input.stockQuantity;
    }

    if (input.unitType !== undefined) {
      product.unitType = input.unitType;
    }

    if (input.weightPerUnit !== undefined) {
      if (input.unitType === 'item') {
        product.weightPerUnit = null;
        return;
      }

      product.weightPerUnit = input.weightPerUnit;
    }

    return this.productsService.updateProduct(product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const product = await this.productsService.getProductById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return await this.productsService.remove(product);
  }
}
