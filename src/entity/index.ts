import { OrderDetailsEntity } from './order.details.entity';
import { OrderEntity } from './order.entity';
import { PaymentEntity } from './payment.entity';
import { ProductEntity } from './product.entity';
import { ProductImageEntity } from './product.image.entity';
import { UserEntity } from './user.entity';
import { VoucherEntity } from './voucher.entity';
import { VoucherUsageEntity } from './voucher.usage.entity';

export const entities = [
  UserEntity,
  ProductEntity,
  OrderEntity,
  OrderDetailsEntity,
  PaymentEntity,
  VoucherEntity,
  VoucherUsageEntity,
  ProductImageEntity,
];
