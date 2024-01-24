import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { ProductInCartEntity } from './entities/product.in.cart.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductInCartEntity)
    private productInCartRepository: Repository<ProductInCartEntity>,
    private productsService: ProductsService,
  ) {}

  async getCart(userId: number): Promise<CartEntity> {
    return await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['products', 'products.product'],
    });
  }

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<CartEntity> {
    let cart = await this.getCart(userId);

    if (!cart) {
      cart = this.cartRepository.create({ user: { id: userId }, products: [] });
    }

    // console.log(cart);

    // Fetch the product entity
    const product = await this.productsService.getProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // console.log(cart.products);

    let productInCart = cart.products.find((p) => p.product.id === productId);

    // console.log(productInCart);

    if (productInCart) {
      console.log('productInCart');
      productInCart.quantity += quantity;
    } else {
      productInCart = this.productInCartRepository.create({
        product: product,
        quantity: quantity,
      });
      cart.products.push(productInCart);
    }
    console.log(cart.products);
    await this.cartRepository.save(cart);
    return cart;
  }

  async removeFromCart(userId: number, productId: number): Promise<CartEntity> {
    const cart = await this.getCart(userId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const productInCart = cart.products.find((p) => p.product.id === productId);
    if (!productInCart) {
      throw new Error('Product not found in cart');
    }

    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
    } else {
      cart.products = cart.products.filter((p) => p.product.id !== productId);
    }

    await this.cartRepository.save(cart);
    return cart;
  }
}
