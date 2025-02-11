import "dotenv/config";
import * as cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import logger from "./utils/loger/loger";

import { join } from "path";
import * as express from "express";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { log, error } = logger("main");

  app.use(cookieParser());

  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: "Content-Type, Authorization",
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

// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000");

// // Подключаемся к серверу
// socket.on("connect", () => {
//   console.log("Подключено к серверу с ID:", socket.id);

//   // При начале квеста
//   socket.emit("startQuest", { userId: 13, questId: 61 });

//   // Подключаемся к комнате наблюдателя
//   socket.emit("joinWatcherRoom", { userId: 13 }); // Например, для наблюдения за пользователем с ID 13

//   // Подписка на обновления
//   socket.on("questStarted", (data) => {
//     console.log("Квест начат", data);
//   });

//   socket.on("timerUpdate", (data) => {
//     console.log("Осталось времени:", data.remaining);
//   });

//   socket.on("timeUp", (data) => {
//     console.log("Время истекло для квеста:", data.questId);
//   });

//   // Получение текущего прогресса (если нужно сразу после подключения)
//   socket.on("currentProgress", (data) => {
//     console.log("Текущий прогресс: ", data);
//   });
// });

// // Обработка ошибок
// socket.on("connect_error", (err) => {
//   console.error("Ошибка подключения:", err);
// });
