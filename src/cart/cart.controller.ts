import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { GetCurrentUserId } from 'src/common/decorators/get.current.user.id.decorator';
import { CartEntity } from './entities/cart.entity';
import { AccessTokenGuard } from 'src/common/guards/jwt.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async getCart(@GetCurrentUserId() userId: number): Promise<CartEntity> {
    return this.cartService.getCart(userId);
  }

  @Post('add')
  @UseGuards(AccessTokenGuard)
  async addToCart(
    @GetCurrentUserId() userId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ): Promise<CartEntity> {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Post('remove')
  @UseGuards(AccessTokenGuard)
  async removeFromCart(
    @GetCurrentUserId() userId: number,
    @Body('productId') productId: number,
  ): Promise<CartEntity> {
    return this.cartService.removeFromCart(userId, productId);
  }
}
