import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('«The Guitar-shop»')
    .setDescription('The Guitar-shop service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('spec', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const configService = app.get(ConfigService);
  const port = configService.get('application.port') || 4000;

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
