import { HttpStatus, NestMiddleware } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

import { MA_CONSTANTS } from "src/common/constants/ma.constants";
import { RESPONSE_MESSAGE } from "src/common/constants/ma.request";
import { hostHeaderDto } from "src/common/dto/host.dto";
import { Utils } from "src/common/utils/utils";

export class NetworkMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.header(`host`)) {
                const host = req.header(`host`).split(`:`)[MA_CONSTANTS.ZERO]
                const hostDto: any = plainToClass(hostHeaderDto, { host: host })
                const errors = await validate(hostDto)
                if (errors.length > 0) {
                    Utils.getLogger().log(`Host: ${host} is Unknown`, NetworkMiddleware.name)
                    if (Utils.isDebug()) Utils.getLogger().debug(`No pass cause: ${JSON.stringify(errors)}`, NetworkMiddleware.name)
                    return res.status(HttpStatus.BAD_REQUEST).json(
                        { message: RESPONSE_MESSAGE.NOT_ALLOWED }
                    );
                }
            }
            next()
        } catch (error) {
            Utils.getLogger().error(`An error has been ocurred: ${error}`, NetworkMiddleware.name);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: RESPONSE_MESSAGE.UNSUPPORTED
            })
        }
    }
}