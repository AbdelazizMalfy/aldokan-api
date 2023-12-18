import { OrdersModule } from 'src/orders/orders.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { VouchersModule } from 'src/vouchers/vouchers.module';

export const AppModules = [
  UsersModule,
  OrdersModule,
  ProductsModule,
  PaymentsModule,
  VouchersModule,
];
