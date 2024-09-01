import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HeadersMiddleware } from './headers.middleware';
import { TimeoutMiddleware } from './timeout.middleware';
import { NotFoundFilter } from './notFound.handler';
import { TaskModule } from 'src/tasks/task.module';


@Global()
@Module({
    imports: [
        ConfigModule,
        TaskModule,
    ],
    providers: [
        TimeoutMiddleware,
        NotFoundFilter,
        HeadersMiddleware,
    ],
})
export class MiddlewareModule { }
