import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
  ) {}

  //   create(createPaymentDto: CreatePaymentDto) {
  //     const payment = this.paymentRepository.create(createPaymentDto);
  //     return this.paymentRepository.save(payment);
  //   }

  //   findAll() {
  //     return this.paymentRepository.find();
  //   }

  //   findOne(id: number) {
  //     return this.paymentRepository.findOneOrFail({ id });
  //   }

  //   update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //     return this.paymentRepository.update(id, updatePaymentDto);
  //   }

  //   remove(id: number) {
  //     return this.paymentRepository.delete(id);
  //   }
}
