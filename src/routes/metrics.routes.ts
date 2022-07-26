import { Request, Response } from "express";
import client from 'prom-client';

/**
 * Métricas por defecto
 */
const register: client.Registry = new client.Registry();
export const httpReqDurationMicroSec: client.Histogram<string> = new client.Histogram({
    name: 'http_default_request_duration_seconds',
    help: 'Duration of HTTP requests in microseconds',
    labelNames: ['method', 'route', 'code', 'origin'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

register.setDefaultLabels(({ app: 'app-prendaria-actualiza-bienes-liquidacion' }));
register.registerMetric(httpReqDurationMicroSec);

export const getMetrics = (req: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    register.metrics().then(metric => {
        res.end(metric);
    }, err => {
        res.send(JSON.stringify(err)).status(500)
    })
}
