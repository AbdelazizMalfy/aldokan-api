import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  orderID: number;

  // @IsNotEmpty()
  // @IsString()
  // currency: string;

  // @IsNotEmpty()
  // @IsString()
  // readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsDate()
  readonly paymentDate: Date = new Date();

  @IsString()
  readonly paymentMethod: string = 'card';
}
