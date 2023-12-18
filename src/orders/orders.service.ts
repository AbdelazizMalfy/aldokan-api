import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
  ) {}

  //   create(createOrderDto: CreateOrderDto) {
  //     const order = this.ordersRepository.create(createOrderDto);
  //     return this.ordersRepository.save(order);
  //   }

  //   findAll() {
  //     return this.ordersRepository.find();
  //   }

  //   findOne(id: number) {
  //     return this.ordersRepository.findOne(id);
  //   }

  //   update(id: number, updateOrderDto: UpdateOrderDto) {
  //     return this.ordersRepository.update(id, updateOrderDto);
  //   }

  //   remove(id: number) {
  //     return this.ordersRepository.delete(id);
  //   }
}
