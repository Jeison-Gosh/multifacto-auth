export enum MA_CONSTANTS {
    NONE = -1,
    ZERO = 0,
    ONE = 1,
}

export enum MA_SERVER_INTERNAL_STATUS {
    STOPPED = 0,
    STARTED = 1,
    RESTARTING = 2,
    ERROR = 3,
}

export enum MA_SERVER_MESSAGE_STATUS {
    STOPPED = 'STOPPED', 
    STARTING = 'STARTING',
    STARTED = 'STARTED',
    COMPLETED = 'COMPLETED',
    RESTARTING = 'RESTARTING',
    ERROR = 'ERROR  ',
}
