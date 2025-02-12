import "dotenv/config";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import logger from "./utils/loger/loger";
import { join } from "path";
import { CORS } from "./constants/enums/cors";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { UPLOAD } from "./constants/dirNames/dirname";
import { DOCS_API } from "./constants/enums/docs-api";
import { EnvException } from "./exceptions/custom.exceptions";

async function bootstrap() {
  const { log, error } = logger("main");
  try {
    if (!process.env.APP_PORT) throw new EnvException();

    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.use(`/${UPLOAD}`, express.static(join(__dirname, "..", UPLOAD)));

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );

    const docsConfig = new DocumentBuilder()
      .setTitle(DOCS_API.TITLE)
      .setDescription(DOCS_API.DESCRIPTION)
      .setVersion(DOCS_API.VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, docsConfig);
    SwaggerModule.setup(DOCS_API.URL, app, document);

    app.enableCors({
      origin: CORS.ORIGIN,
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
