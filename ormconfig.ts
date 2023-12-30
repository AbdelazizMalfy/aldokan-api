import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DB_HOST);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/src/**/entities/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  synchronize: false,
});
