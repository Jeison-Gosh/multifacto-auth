
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { RESPONSE_MESSAGE } from '../common/constants/ma.request';
import { Utils } from 'src/common/utils/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PayloadMiddleware implements NestMiddleware {

    constructor(private readonly config: ConfigService) {
        this.config = config
    }
    
    async use(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const payloadLimit = this.config.get<number>(`apiConfig.payloadLimit`)
            let receivedDataSize;
            req.on('data', (chunk) => {
                receivedDataSize += chunk.length;
                if (Utils.isDebug()) Utils.getLogger().debug(`Payload: ${receivedDataSize}`, PayloadMiddleware.name)
                if (receivedDataSize > payloadLimit) {
                    req.destroy()
                    if (Utils.isDebug()) Utils.getLogger().debug(`Payload too long, size: ${receivedDataSize}`, PayloadMiddleware.name)
                    return res.status(HttpStatus.PAYLOAD_TOO_LARGE).json({
                        message: RESPONSE_MESSAGE.UNAUTHORIZED
                    });
                }
            });
            next()
        } catch (error) {
            Utils.getLogger().error(`An error has been ocurred: ${error}`, PayloadMiddleware.name);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: RESPONSE_MESSAGE.UNSUPPORTED
            })
        }
    }
}





