import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { BaseResponse } from '../presenters/base-response.presenter';
import { InvalidParamError } from 'src/shared/domain/errors/invalid-param.error';
import { Response } from 'express';

@Catch(InvalidParamError)
export class InvalidParamErrorFilter implements ExceptionFilter {
  catch(exception: InvalidParamError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(HttpStatus.CONFLICT)
      .send(
        BaseResponse.error(
          HttpStatus.CONFLICT,
          exception.name,
          exception.errors,
          exception.message,
        ),
      );
  }
}
