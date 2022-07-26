import * as dotenv from 'dotenv';
dotenv.config();
import Colors = require('colors.ts');
Colors.enable();
import { apiServer } from "./src/index";
import { API_PREFX, APIPORT, GRALIP, API_VER } from './src/configs';
import moment = require('moment');


apiServer.listen({ port: APIPORT, host: GRALIP }, () => {
    console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} Run API-Server on: ${GRALIP}:${APIPORT}/${API_PREFX}/v${API_VER}`.green);
})

process.on('uncaughtException', (err: Error) => {
    console.log(`Excepción no controlada: \n ${err.name} ${err.message} ${err.stack}`);
})