import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import { AuthGuard } from './auth/auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard());
  const config = new DocumentBuilder()
    .setTitle('Poker API')
    .setDescription('The poker API description')
    .setVersion('1.0')
    .addTag('poker')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
