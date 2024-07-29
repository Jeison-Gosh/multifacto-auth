import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from 'express'

import { RESPONSE_MESSAGE } from "src/common/constants/ma.request";
import { Utils } from "src/common/utils/utils";

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {

    constructor(
        private readonly config: ConfigService) {
        this.config = config
    }
    use(req: Request, res: Response, next: NextFunction): any {
        try {
            const timeoutDuration = this.config.get<number>(`apiConfig.timeout`)
            const timeoutId = setTimeout(() => {
                Utils.getLogger().warn(`ORIGIN: ${req.hostname} PATH: ${req.originalUrl}`, TimeoutMiddleware.name)
                return res.status(HttpStatus.REQUEST_TIMEOUT).json({
                    message: RESPONSE_MESSAGE.UNSUPPORTED
                });
            }, timeoutDuration);

            res.on('finish', () => {
                clearTimeout(timeoutId);
            });
            next();
        }
        catch (error) {
            Utils.getLogger().error(`An error has been ocurred: ${error}`, TimeoutMiddleware.name);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: RESPONSE_MESSAGE.UNSUPPORTED
            })
        }
    }
}