
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { RESPONSE_MESSAGE, RESPONSE_STATUS } from '../common/constants/ma.request';
import { Utils } from 'src/common/utils/utils';

@Injectable()
export class HeadersMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.header('Accept-Language') || !req.header('App') ) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: RESPONSE_MESSAGE.INVALID_ENTRY
                });
            }
            if (req.rawHeaders.length >= 150) {
                if (Utils.isDebug()) {
                    Utils.getLogger().debug(`Too many headers, count: ${req.rawHeaders.length}`, HeadersMiddleware.name)
                }
                return res.status(RESPONSE_STATUS.REQUEST_HEADER_FIELDS_TOO_LARGE).json({
                    message: RESPONSE_MESSAGE.UNSUPPORTED
                })
            }
            next()
        } catch (error) {
            Utils.getLogger().error(`An error has been ocurred: ${error}`, HeadersMiddleware.name);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: RESPONSE_MESSAGE.UNSUPPORTED
            })
        }
    }
}





