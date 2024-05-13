import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Challenge Product')
    .setDescription('API para prueba técnica')
    .setVersion('1.0')
    .addTag('user')
    .addTag('auth')
    .addTag('product')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)

  SwaggerModule.setup('api', app, document)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(parseInt(process.env.PORT, 10) || 3000)
}

bootstrap()
