import { Injectable } from "@nestjs/common"
import { CronExpression, SchedulerRegistry } from "@nestjs/schedule"
import * as Cron from 'node-cron'

import { MA_CONSTANTS  } from "src/common/constants/ma.constants"
import { Utils } from "src/common/utils/utils"
import { SCHEDULE_OPTION, TIME_UNITS } from "./task.utils"


@Injectable()
export class TaskService {
    private intervalCount: number
    private cronCount: number
    private timeoutCount: number

    constructor(private readonly scheduleService: SchedulerRegistry) {
        this.scheduleService = scheduleService
        this.intervalCount = MA_CONSTANTS.ZERO;
        this.cronCount = MA_CONSTANTS.ZERO;
        this.timeoutCount = MA_CONSTANTS.ZERO;
    }
    

    addTask(name: string, time: number, timeUnit: TIME_UNITS | CronExpression, operation: SCHEDULE_OPTION, callback: any): void {
        let timeCalculated = 0
        if (time && typeof time === 'number') {
            timeCalculated = this.convertTimeToMilliseconds(+time, timeUnit as TIME_UNITS)
        }
        try {
            switch (operation) {
                case SCHEDULE_OPTION.CRON:
                    if (this.scheduleService.doesExist(SCHEDULE_OPTION.CRON, name)) {
                        this.scheduleService.deleteCronJob(name)
                    }
                    const cronCb = (): any => {
                        this.logTaskIfDebug(name, null, timeUnit as CronExpression )
                        callback()
                    }
                    const job = Cron.schedule(timeUnit as CronExpression, cronCb)
                    this.scheduleService.addCronJob(name, job);
                    if (this.cronCount !== this.scheduleService.getCronJobs().size) {
                        this.cronCount++;
                        Utils.getLogger().verbose(`CronJob [${name}] was created.`, TaskService.name)
                    }
                    break;
                case SCHEDULE_OPTION.INTERVAL:
                    if (this.scheduleService.doesExist(SCHEDULE_OPTION.INTERVAL, name)) {
                        this.scheduleService.deleteInterval(name)
                    }
                    const intervalCb = (): any => {
                        this.logTaskIfDebug(name, time, timeUnit)
                        callback()
                    }
                    const interval = setInterval(intervalCb, timeCalculated)
                    this.scheduleService.addInterval(name, interval);
                    if (this.intervalCount !== this.scheduleService.getIntervals().length) {
                        this.intervalCount++;
                        Utils.getLogger().verbose(`Interval [${name}] was created.`, TaskService.name)
                    }
                    break;
                case SCHEDULE_OPTION.TIMEOUT:
                    if (this.scheduleService.doesExist(SCHEDULE_OPTION.TIMEOUT, name)) {
                        this.scheduleService.deleteTimeout(name)
                    }
                    const timeoutCb = (): any => {
                        this.logTaskIfDebug(name, time, timeUnit)
                        callback()
                    }
                    const timeout = setTimeout(timeoutCb, timeCalculated)
                    this.scheduleService.addTimeout(name, timeout);
                    if (this.timeoutCount !== this.scheduleService.getTimeouts().length) {
                        this.timeoutCount++;
                        Utils.getLogger().verbose(`Timeout [${name}] was created.`, TaskService.name)
                    }
                    break;
                default:
                    Utils.getLogger().warn(`(${name}), Task type not found.`, TaskService.name)
                    break;
            }
        } catch (error) {
            Utils.getLogger().error(`Can't create Task ${name} cause: ${error.message}`, TaskService.name)
        }
    }

    deleteTask(name: string, operation: SCHEDULE_OPTION) {
        try {
            switch (operation) {
                case SCHEDULE_OPTION.CRON:
                    if (this.scheduleService.doesExist(SCHEDULE_OPTION.CRON, name)) {
                        this.scheduleService.deleteCronJob(name)
                    }
                    break;
                case SCHEDULE_OPTION.INTERVAL:
                    if (this.scheduleService.doesExist(SCHEDULE_OPTION.INTERVAL, name)) {
                        this.scheduleService.deleteInterval(name)
                    }
                    break;
                case SCHEDULE_OPTION.TIMEOUT:
                    if (this.scheduleService.doesExist(SCHEDULE_OPTION.TIMEOUT, name)) {
                        this.scheduleService.deleteTimeout(name)
                    }
                    break;
                default:
                    Utils.getLogger().warn(`(${name}), Task type not found.`, TaskService.name)
                    break;
            }
        } catch (error) {
            Utils.getLogger().error(`Can't delete Task ${name} cause: ${error.message}`, TaskService.name)
        }
    }


    private convertTimeToMilliseconds(time: number, timeUnit: TIME_UNITS): number {
        if (isNaN(time) || !isFinite(time)) {
            Utils.getLogger().warn(`Can't create task cause time is not a number.`, TaskService.name);
            return;
        }
        let convertedTime: number = -1;
        switch (timeUnit) {
            case TIME_UNITS.MILLISECONDS:
                break;
            case TIME_UNITS.SECONDS:
                convertedTime = Math.abs(time * 1000);
                break;
            case TIME_UNITS.MINUTES:
                convertedTime = Math.abs(time * 60000);
                break;
            case TIME_UNITS.HOURS:
                convertedTime = Math.abs(time * 3600000);
                break;
            case TIME_UNITS.DAYS:
                convertedTime = Math.abs(time * 86400000);
                break;
            default:
                Utils.getLogger().warn(`(${timeUnit}), time type not supported.`, TaskService.name)
                break;
        }
        return convertedTime
    }

    private logTaskIfDebug(name: string, time: number, timeUnit: TIME_UNITS | CronExpression): void {
        if (Utils.isDebug()) Utils.getLogger().debug(`[${name}] was called, scheduled at ${time ?? ''} ${timeUnit}.`, TaskService.name)
    }

}