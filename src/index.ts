/**
 * Servidor de la API
 */
import http from 'http';
import fs from 'fs';
import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import routes from './routes';
import path from 'path';
import { httpReqDurationMicroSec } from "./routes/metrics.routes";
import cors from 'cors';
import { API_PREFX, API_VER } from './configs';
import helmet from 'helmet';
const compression = require('compression');
const router: Express = express();

router.use(helmet());
router.use(compression());

morgan.token('splitter', (req) => {
    return "\x1b[36m--------------------------------------------\x1b[0m\n";
});
morgan.token('statusColor', (req, res, args) => {
    // get the status code if response written
    let status: Number | undefined = Boolean(res.headersSent) ? res.statusCode : undefined

    // get status color
    let color = status && status >= 500 ? 31 // red
        : status && status >= 400 ? 33 // yellow
            : status && status >= 300 ? 36 // cyan
                : status && status >= 200 ? 32 // green
                    : 0; // no color

    return '\x1b[' + color + 'm' + status + '\x1b[0m';
});

morgan.token('jsonData', (req, res) => {
    let jsonBody: string = '';
    let body: Buffer[] = [];
    res.on('data', chunk => {
        console.log('data chunk: ', typeof chunk, chunk);
        body.push(chunk)
    })
    res.on('end', () => jsonBody = Buffer.concat(body).toString())
    return `\x1b[35m (${jsonBody})\x1b[0m`
});

router.use(morgan(`\x1b[34m:remote-addr\x1b[0m \x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms \x1b[30m- length|:res[content-length]\x1b[0m :jsonData`, { skip: (req, res) => req.method == 'OPTIONS' }));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors({ origin: '*' }));

router.use('/favicon.ico', express.static(path.join(__dirname, '../public/assets/images', 'favicon.ico')));

router.use(`/${API_PREFX}/v${API_VER}`, routes);


router.use((req: Request, res: Response) => {
    const metric = httpReqDurationMicroSec.startTimer();
    const error: Error = new Error('Not Fount!');
    metric({ route: req.url, code: 404, method: req.method, origin: req.headers.origin })
    return res.status(404).json({ message: error.message });
});

export const apiServer = http.createServer(router);
