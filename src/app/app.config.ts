import { registerAs } from '@nestjs/config'

import { Utils } from 'src/common/utils/utils';

export const apiConfig = registerAs('apiConfig', () => {
    return {
        apiName: process.env.API_NAME                           ||`RP_AUTH`,
        timeout: +process.env.BASE_TIMEOUT                      || 10000,
        payloadLimit: +process.env.BASE_PAYLOAD                 || 10240,
        protocol: process.env.APP_PROTOCOL                      || `http`,
    }
});

export const databaseConfig = registerAs('databaseConfig', () => {
    return {
        host: process.env.DB_HOST                               || `localhost`,
        port: +process.env.DB_PORT                              || 5432,
        name: process.env.DB_NAME                               || `postgres`,
        user: process.env.DB_USER                               || `postgres`,
        pass: process.env.DB_PASS                               || `password`,
        timeout: +process.env.DB_TIMEOUT                        || 5000,
        conLimit: +process.env.DB_MAX_CON                       || 50000,
        conTimeout: +process.env.DB_CON_TIMEOUT                 || 15000,
        reconnectTime: +process.env.DB_CON_RECONNECT_TIME       || 30,
        isConReconnect: process.env.DB_IS_CON_RECONNECT         || true,
        isSSLEnabled: process.env.DB_IS_SSL                     || false,            
    }
});

export const basicConfig = {
    server: {
        NAME: process.env.APP_NAME                              || `AuthServer`,
        HOST: process.env.APP_HOSTNAME                          || `localhost`,
        PORT: +process.env.APP_PORT                             || 7099,
    },
    app: {
        NAME: process.env.APP_NAME                              || `auth`,
        PREFIX: process.env.APP_PREFIX                          || `api`,
        MAX_PAYLOAD: +process.env.APP_PAYLOAD_MAX               || 10240,
        DEFAULT_TIMEOUT: +process.env.BASE_TIMEOUT              || 30000,
    }
}

export const fetchMode = (): void => {
    Utils.setDebug(process.execArgv.length >= 1)
}
