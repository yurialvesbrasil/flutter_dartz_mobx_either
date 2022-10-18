import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './modules/app/app.module';
import { nestCsrf } from 'ncsrf';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Auth API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // setup route middlewares
  app.disable('x-powered-by');
  app.enableCors({
    origin: true,
  });
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(helmet.noSniff());
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
  app.use(helmet.hidePoweredBy());
  app.use(cookieParser());
  app.use(nestCsrf({ cookie: true }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
