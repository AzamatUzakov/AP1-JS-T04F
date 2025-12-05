import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Разрешаем CORS для фронтенда на 5173
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();
