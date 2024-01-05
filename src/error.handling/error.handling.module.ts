import { Module } from '@nestjs/common';
import { ErrorHandlingService } from './error.handling.service';

@Module({
  imports: [],
  providers: [ErrorHandlingService],
  exports: [ErrorHandlingService],
})
export class ErrorHandlingModule {}
