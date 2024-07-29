import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app/app.module';

import { fetchMode, basicConfig } from './app/app.config';
import { Utils } from './common/utils/utils';
import * as bodyParser from 'body-parser';

class Main {

  private static port: number
  private static server: INestApplication;
  private static serverMetadata: any

  static async startApp() {
    //process.env.DEBUG = '*'
    Utils.getLogger().verbose(`App [${basicConfig.server.NAME}] is running on PID: ${process.pid}`, Main.name)
    fetchMode();

    Main.server = await NestFactory.create(AppModule);
    Main.getServer().use(bodyParser.json({ limit: basicConfig.app.MAX_PAYLOAD }))
    Main.getServer().setGlobalPrefix(basicConfig.app.PREFIX);
    Main.getServer().getHttpServer().once(`listening`, () => {
      Utils.getLogger().verbose(`[ *** SERVER IS HANDLE ON PORT -> ${Main.port} ***] `, Main.name)
    })
    Main.startServer()
    if (Utils.isDebug()) Utils.getLogger().debug(`[SERVER CONFIG] ${JSON.stringify(Main.getServer().getHttpServer())}`, Main.name)

  }

  public static async startServer(): Promise<void> {
    Main.serverMetadata = await Main.getServer().listen(Main.getPort())
  }

  public static getPort(): number {
    return Main.port
  }

  public static setPort(port: number): void {
    Main.port = port
  }

  protected static getServer(): INestApplication {
    return Main.server;
  }

  protected static getServerMetadata(): any {
    return Main.serverMetadata;
  }


}

export default Main

Main.startApp()