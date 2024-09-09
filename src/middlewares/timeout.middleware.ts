import { HttpStatus, Injectable, NestMiddleware, RequestTimeoutException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from 'express'

import { RESPONSE_MESSAGE } from "src/common/constants/ma.request";
import { Utils } from "src/common/utils/utils";
import { TaskService } from "src/tasks/task.service";
import { SCHEDULE_OPTION, TIME_UNITS } from "src/tasks/task.utils";

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {

    constructor(
        private readonly config: ConfigService,
        private readonly taskService: TaskService,
    ) {
        this.config = config
    }

    use(req: Request, res: Response, next: NextFunction): any {
        try {
            const method: string = req.method;
            const url: string = req.url;
            const now = Date.now();
            Utils.getLogger().verbose(`[REQ] ${method} ${url}`, TimeoutMiddleware.name);

            const timeoutDuration: number = this.config.get<number>(`apiConfig.timeout`)
            this.taskService.addTask(`TimeoutRequestHandler`, timeoutDuration, TIME_UNITS.MILLISECONDS, SCHEDULE_OPTION.TIMEOUT, () => {
                if (!res.headersSent) {
                    Utils.getLogger().warn(`ORIGIN: ${req.hostname} PATH: ${req.originalUrl}`, TimeoutMiddleware.name)
                    return res.status(HttpStatus.REQUEST_TIMEOUT).json({
                        message: RESPONSE_MESSAGE.UNSUPPORTED
                    });
                }
            })
            res.on('finish', () => {
                this.taskService.deleteTask(`TimeoutRequestHandler`, SCHEDULE_OPTION.TIMEOUT)
                const responseTime = Date.now() - now;
                Utils.getLogger().verbose(`[RES] ${method} ${url} -- ${responseTime}ms`, TimeoutMiddleware.name);
            });
            next()
        } catch (error) {
            Utils.getLogger().error(`An error has been ocurred: ${error}`, TimeoutMiddleware.name);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: RESPONSE_MESSAGE.UNSUPPORTED
            })
        }
    }
}