import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger from './utils/loger/loger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { log, error } = logger('main');
  app.use(cookieParser());

  try {
    await app.listen(process.env.APP_PORT ?? 3000);
    log(`Server is running`);
  } catch (err) {
    error(`Server stopped`, err);
  }
}

bootstrap();
