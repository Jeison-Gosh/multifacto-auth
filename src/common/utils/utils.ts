import { Logger } from "@nestjs/common";

import {  } from "../constants/ma.request";
export class Utils {

    private static logs: Logger;
    private static isDebugOn: boolean;

    public static getLogger(): Logger {
        return Utils.logs ? Utils.logs : Utils.logs = new Logger();
    }

    public static isDebug(): boolean {
        return Utils.isDebugOn
    }

    public static setDebug(debug: boolean): void {
        Utils.isDebugOn = debug
    }
}