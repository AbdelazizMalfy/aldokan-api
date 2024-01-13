import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create.payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-stripe-payment')
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<string> {
    return await this.paymentsService.createStripePayment(createPaymentDto);
  }

  //   @Get()
  //   findAll() {
  //     return this.paymentsService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.paymentsService.findOne(+id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //     return this.paymentsService.update(+id, updatePaymentDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.paymentsService.remove(+id);
  //   }
}
