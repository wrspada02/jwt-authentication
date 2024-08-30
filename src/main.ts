import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  await mongoose.connect(process.env.MONGODB_URL);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
