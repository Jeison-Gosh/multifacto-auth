import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HeadersMiddleware } from './headers.middleware';
import { TimeoutMiddleware } from './timeout.middleware';
import { NotFoundFilter } from './notFound.handler';


@Global()
@Module({
    imports: [
        ConfigModule,
    ],
    providers: [
        NotFoundFilter,
        HeadersMiddleware,
        TimeoutMiddleware
    ],
})
export class DatabaseModule { }
