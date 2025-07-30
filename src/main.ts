import { AppModule } from './shared/infra/app.module';
import { BadRequestError } from './shared/domain/errors/bad-request.error';
import { BadRequestErrorFilter } from './shared/infra/exception-filters/bad-request-error.filter';
import { ConflictErrorFilter } from './shared/infra/exception-filters/conflict-error.filter';
import { InvalidParamErrorFilter } from './shared/infra/exception-filters/invalid-param-error.filter';
import { NestFactory } from '@nestjs/core';
import { NotFoundErrorFilter } from './shared/infra/exception-filters/not-found-error.filter';
import { ValidationError } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { flattenValidationErrors } from './shared/infra/exception-filters/utils/flatten-validation-errors.utils';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.use(helmet());

  app.setGlobalPrefix('/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const result = flattenValidationErrors(errors);
        return new BadRequestError(
          'Erro na validação dos parâmetros enviados',
          result,
        );
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new BadRequestErrorFilter(),
    new ConflictErrorFilter(),
    new InvalidParamErrorFilter(),
    new NotFoundErrorFilter(),
  );

  await app.listen(3000);
}
bootstrap();
