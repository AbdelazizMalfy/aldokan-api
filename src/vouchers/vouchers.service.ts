import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoucherEntity } from './entities/voucher.entity';

@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(VoucherEntity)
    private vouchersRepository: Repository<VoucherEntity>,
  ) {}

  //   create(createVoucherDto: CreateVoucherDto) {
  //     const voucher = this.vouchersRepository.create(createVoucherDto);
  //     return this.vouchersRepository.save(voucher);
  //   }

  //   findAll() {
  //     return this.vouchersRepository.find();
  //   }

  //   findOne(id: number) {
  //     return this.vouchersRepository.findOne(id);
  //   }

  //   update(id: number, updateVoucherDto: UpdateVoucherDto) {
  //     return this.vouchersRepository.update(id, updateVoucherDto);
  //   }

  //   remove(id: number) {
  //     return this.vouchersRepository.delete(id);
  //   }
}
