import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const firebaseConfig = {
    apiKey: 'AIzaSyCQMZOa7-K9ggxGIB43VbYSC3rv4bUNV30',
    projectId: 'paggo-take-home-case',
  };

  admin.initializeApp(firebaseConfig);
  await app.listen(3000);
}
bootstrap();
