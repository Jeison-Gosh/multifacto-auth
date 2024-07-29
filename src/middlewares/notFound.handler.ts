import { ExceptionFilter, Catch, NotFoundException } from '@nestjs/common';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { RESPONSE_MESSAGE } from 'src/common/constants/ma.request';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx : HttpArgumentsHost = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(HttpStatus.NOT_FOUND).json({
            message: RESPONSE_MESSAGE.NOT_FOUND,
        });
    }
}
