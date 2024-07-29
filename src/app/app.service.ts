import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Main from 'src/main';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService){
    Main.setPort(this.configService.get<number>('appConfig.port'));
  }
  getStatus(): string {
    return 'Hello   World!';
  }
}
