import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger from './utils/loger/loger';

import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { log, error } = logger('main');

  app.use(cookieParser());

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  try {
    await app.listen(process.env.APP_PORT ?? 3000);
    log(`Server is running`);
  } catch (err) {
    error(`Server stopped`, err);
  }
}

bootstrap();
