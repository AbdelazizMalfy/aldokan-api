import { Controller } from '@nestjs/common';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  //   @Post()
  //   create(@Body() createVoucherDto: CreateVoucherDto) {
  //     return this.vouchersService.create(createVoucherDto);
  //   }

  //   @Get()
  //   findAll() {
  //     return this.vouchersService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.vouchersService.findOne(+id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
  //     return this.vouchersService.update(+id, updateVoucherDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.vouchersService.remove(+id);
  //   }
}
