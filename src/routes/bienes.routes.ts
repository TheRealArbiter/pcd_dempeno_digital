/**
 * Rutas para operaciones con bienes...
 */
import { Request, Response } from "express";
import { bienesControllers } from "../controllers";
import { Parameters } from "../interfaces/Parameters.interface";
import { httpReqDurationMicroSec } from "./metrics.routes";
import { IRequestBienesMovimientos } from "../interfaces/RequestBienesMovimientos.interface";

const Bienes = bienesControllers.Bienes.getInstance();

const getBienes = (req: Request, res: Response) => {
    const metric: Function = httpReqDurationMicroSec.startTimer();
    let bienesRequest: IRequestBienesMovimientos = { ...req.body}
    Bienes.getBienes(bienesRequest).then(resp => {
        let stat: number = resp.ok ? 200 : 500
        res.status(stat).json(resp.ok ? resp.data : resp.error?.message)
        metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || ''})
    }, (err: Error) => {
        res.status(500).json(err);
        metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
    })
}

export default { getBienes }