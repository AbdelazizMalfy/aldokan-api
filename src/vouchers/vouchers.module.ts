import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { VoucherEntity } from './entities/voucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherEntity])],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
