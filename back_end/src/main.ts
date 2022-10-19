import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

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
  // app.disable('x-powered-by');
  // app.enableCors({
  //   origin: true,
  // });
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: false,
  //   }),
  // );
  // app.use(helmet.noSniff());
  // app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
  // app.use(helmet.hidePoweredBy());
  // app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
