import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { TaskModule } from 'src/tasks/task.module';

@Module({
  imports: [CodesModule, TaskModule],
  providers: [CodesService],
  controllers: [CodesController]
})
export class CodesModule {}
