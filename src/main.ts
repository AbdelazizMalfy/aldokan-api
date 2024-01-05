import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('App-bootstrap');

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = config.get<number>('PORT') || 9000;
  await app.listen(port);
  logger.log('Application listenning on port: ' + port);
}
bootstrap();
