import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // VueアプリのURL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 許可するHTTPメソッド
    // credentials: true, // クッキーを使用する場合はtrueにする
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
