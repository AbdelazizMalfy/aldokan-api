import { Injectable } from '@nestjs/common';
import { SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class ErrorHandlingService {
  constructor(private readonly sentry: SentryService) {}

  reportErrorToSentry(error: any, message?: string, context?: any) {
    const eventId = this.sentry.instance().captureException(error, {
      extra: context,
    });

    if (message) {
      this.sentry.instance().captureMessage(message, {
        level: 'error',
        fingerprint: [eventId],
        extra: context,
      });
    }
  }
}
