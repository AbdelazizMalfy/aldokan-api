import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppModules } from 'src/app.modules';
import { AuthModule } from './auth/auth.module';

// const entitiesPath =
//   process.env.NODE_ENV === 'production'
//     ? 'dist/src/**/entities/*.entity.js'
//     : 'src/**/entities/*.entity.ts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global (no need to import into other modules)
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: ['dist/src/**/entities/*.entity.js'],
        synchronize: config.get('DB_SYNCHRONIZE') === 'true', // Ensuring boolean value
        // synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ...AppModules,
    AuthModule,
  ],
})
export class AppModule {}
