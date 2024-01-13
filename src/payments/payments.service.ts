import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create.payment.dto';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_f74c1rN3bjxf0fsSnCCHTwzS00xLGyOLjC', {
  typescript: true,
});

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
  ) {}

  async createStripePayment(createPaymentDto: CreatePaymentDto) {
    console.log(createPaymentDto);

    const payment = this.paymentRepository.create(createPaymentDto);
    const stripePayment = await stripe.paymentIntents.create({
      amount: createPaymentDto.amount * 100,
      currency: 'eur',
    });

    await this.paymentRepository.save(payment);
    return stripePayment.client_secret;
  }
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
