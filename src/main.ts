import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app/app.module';

import { fetchMode, defaultConfig } from './app/app.config';
import { Utils } from './common/utils/utils';
import * as bodyParser from 'body-parser';

class Main {

  private static port: number
  private static apiPrefix: string
  private static server: INestApplication
  private static serverMetadata: any

  static async startApp() {
    //process.env.DEBUG = '*'
    Utils.getLogger().verbose(`App [${defaultConfig.server.NAME}] is running on PID: ${process.pid}`, Main.name)
    fetchMode();
    //valores por defecto.
    Main.server = await NestFactory.create(AppModule);
    Main.getServer().use(bodyParser.json({ limit: defaultConfig.app.MAX_PAYLOAD }))
    Main.getServer().setGlobalPrefix(defaultConfig.app.PREFIX);
    Main.getServer().getHttpServer().once(`listening`, () => {
      Utils.getLogger().verbose(`[ *** SERVER IS HANDLE ON PORT -> ${Main.port} ***] `, Main.name)
    })
    Main.startServer()
    if (Utils.isDebug()) Utils.getLogger().debug(`[SERVER CONFIG] ${JSON.stringify(Main.getServer().getHttpServer())}`, Main.name)

  }

  public static async startServer(): Promise<void> {
    // Se cargan establecen los valores precargados.

    Main.getServer().setGlobalPrefix(Main.getApiPrefix())
    Main.serverMetadata = await Main.getServer().listen(Main.getPort())
  }

  public static getPort(): number {
    return Main.port
  }

  public static setPort(port: number): void {
    Main.port = port
  }

  public static setApiPrefix(apiPrefix: string): void {
    Main.apiPrefix = apiPrefix;
  }

  public static getApiPrefix(): string {
    return Main.apiPrefix;
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