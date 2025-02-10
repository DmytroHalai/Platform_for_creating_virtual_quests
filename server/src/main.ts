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

// import { io } from 'socket.io-client';

// const socket = io('http://localhost:4000');

// // При начале квеста:
// socket.emit('startQuest', { userId: 13, questId: 61 });

// // Подписка на обновления:
// socket.on('questStarted', (data) => {
//   console.log('Квест начат', data);
// });
// socket.on('timerUpdate', (data) => {
//   console.log('Осталось времени:', data.remaining);
// });
// socket.on('timeUp', (data) => {
//   console.log('Время истекло для квеста:', data.questId);
// });
// socket.on('progressUpdate', (data) => {
//   console.log('Обновление прогресса:', data);
// });
// socket.on('Error', (data) => {
//   console.log('Error:', data);
// });

