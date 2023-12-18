export class CreatePaymentDto {
  orderID: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
}
