import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';

@Module({
  imports: [CodesModule],
  providers: [CodesService],
  controllers: [CodesController]
})
export class CodesModule {}
