import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app/app.module';

import { fetchMode, basicConfig } from './app/app.config';
import { Utils } from './common/utils/utils';
import * as bodyParser from 'body-parser';

class Main {

  private static server: INestApplication;

  static async startApp() {
    //process.env.DEBUG = '*'
    
    Utils.getLogger().verbose(`App [${basicConfig.server.NAME}] is running on PID: ${process.pid}`, Main.name)
    fetchMode();
    
    
    Main.server = await NestFactory.create(AppModule);
    Main.getServer().use(bodyParser.json({ limit: basicConfig.app.MAX_PAYLOAD }))
    Main.getServer().setGlobalPrefix(basicConfig.app.PREFIX);
    Main.getServer().getHttpServer().once(`listening`, () =>{
      const port = basicConfig.server.PORT
      Utils.getLogger().verbose(`[ *** SERVER IS HANDLE ON: ${port} ***] `, Main.name)
    })
    if (Utils.isDebug()) Utils.getLogger().debug(`[SERVER CONFIG] ${JSON.stringify(Main.getServer().getHttpServer())}`, Main.name)
    

  }

  public static getServer(): INestApplication {
    return Main.server;
  }

}

Main.startApp()