import "dotenv/config";
import * as cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import logger from "./utils/loger/loger";
import { ValidationPipe } from "@nestjs/common";
import * as express from "express";
import { join } from "path";
import { CORS } from "./constants/enums/cors";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const { log, error } = logger("main");

  try {
    if (!process.env.APP_PORT) {
      throw new Error("APP_PORT is not defined in environment variables");
    }

    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );

    const config = new DocumentBuilder()
      .setTitle("User API")
      .setDescription("DOMinators Quest API")
      .setVersion("1.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    app.enableCors({
      origin: process.env.CLIENT_ORIGIN,
      methods: CORS.METHODS,
      allowedHeaders: CORS.HEADERS,
      credentials: CORS.CREDENTIALS,
    });

    const port = Number(process.env.APP_PORT);
    await app.listen(port);
    log(`Server is running on http://localhost:${port}`);
  } catch (err) {
    error("Failed to start the server", err);
    process.exit(1);
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
