import { Module } from '@nestjs/common';
import { HealthController } from './healthz.controller';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [],
})
export class HealthzModule {}
