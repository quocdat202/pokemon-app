import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS để frontend có thể gọi API
  app.enableCors({
    origin: 'http://localhost:3001', // URL của React app (chạy trên port 3002)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000); // Backend chạy trên port 3000
}
bootstrap();
