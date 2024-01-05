import { OrdersModule } from 'src/orders/orders.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { VouchersModule } from 'src/vouchers/vouchers.module';
import { AuthModule } from './auth/auth.module';
import { HealthzModule } from './healthz/healthz.module';
import { ErrorHandlingModule } from './error.handling/error.handling.module';

export const AppModules = [
  UsersModule,
  OrdersModule,
  ProductsModule,
  PaymentsModule,
  VouchersModule,
  AuthModule,
  HealthzModule,
  ErrorHandlingModule,
];
