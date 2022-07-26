/**
 * Rutas para operaciones con mensajes...
 */
import { Request, Response } from "express";
import { msgsControllers } from "../controllers";
import { Parameters } from "../interfaces/Parameters.interface";
import { MessagesRequest } from "../interfaces/MessagesRequest.interface";
import { httpReqDurationMicroSec } from "./metrics.routes";

const Msgs = msgsControllers.Messages.getInstance();

const getMessages = (req: Request, res: Response) => {
    const metric: Function = httpReqDurationMicroSec.startTimer();
    let messagesRequest: MessagesRequest = { ...req.body };
    Msgs.getMessages(messagesRequest).then(resp => {
        let stat: number = resp.ok ? 200 : 500
        res.status(stat).json(resp.ok ? resp.data : resp.error?.message);
        metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || '' });
    }, (err: Error) => {
        res.status(500).json(err);
        metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
    });
}

// const getPrivateMsgs = (req: Request, res: Response) => {
//     const metric: Function = httpReqDurationMicroSec.startTimer();
//     let messagesRequest: MessagesRequest = {...req.body};
//     Msgs.getPrivateMessage(messagesRequest).then(resp => {
//         let stat: number = resp.ok ? 200 : 500
//         res.status(stat).json(resp.ok ?  resp.data : resp.error?.message);
//         metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || '' });
//     }, (err: Error) => {
//         res.status(500).json(err);
//         metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
//     });
// }

const saveMessage = (req: Request, res: Response) => {
    const metric: Function = httpReqDurationMicroSec.startTimer();
    let msg: MessagesRequest = { ...req.body }
    try {
        Msgs.saveMessage(msg).then(resp => {
            let stat: number = resp.ok ? 200 : 500;
            res.status(stat).json(resp.ok ? resp.data : resp.error?.message);
            metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || '' });
        }, (err: Error) => {
            res.status(500).json(err);
            metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
        })
    } catch (error) {
        console.log("Error al guardar el mensaje", error)
    }
}

const hideMessages = (req: Request, res: Response) => {
    const metric: Function = httpReqDurationMicroSec.startTimer();
    let messagesRequest: MessagesRequest = {
        toAll: req.body.toAll,
        to: req.body.to,
        from: req.body.from,
        timestamp: req.body.timestamp,
        timestamp_humanize: req.body.timestamp_humanize,
        group_id: req.body.group_id

    }

    try {
        if (messagesRequest.toAll) {
            Msgs.hideMessagesAll(messagesRequest).then(resp => {
                let stat: number = resp.ok ? 200 : 500;
                res.status(stat).send(`Hidden messsages for ${req.body.to}`);
                metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || '' });
            }, (err: Error) => {
                res.status(500).json(err);
                metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
            });
        } else {
            let messagesRequest: MessagesRequest = {
                toAll: req.body.toAll,
                from: req.body.from,
                to: req.body.to,
                timestamp: req.body.timestamp,
                timestamp_humanize: req.body.timestamp_humanize,
                group_id: req.body.group_id



            }
            Msgs.hideMessagesTo(messagesRequest).then(resp => {
                let stat: number = resp.ok ? 200 : 500;
                res.status(stat).json(`Hidden messages for ${req.body.showMeFrom}`)
                metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || '' });
            }, (err: Error) => {
                res.status(500).json(err);
                metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
            });
        }
    } catch (error) {
        console.log("Error al ocultar los mensajes", error)
    }

}

const deleteMessages = (req: Request, res: Response) => {
    const metric: Function = httpReqDurationMicroSec.startTimer();
    let messagesRequest: MessagesRequest
    try {
        messagesRequest = {
            toAll: req.body.toAll ? req.body.toAll : false,
            khonnect_id: req.body.khonnect_id,
            to: "",
            from: "",
            showMeFrom: false,
            readed: false,
            message: '',
            showMeTo: false,
            timestamp: new Date().getTime() / 1000,
            timestamp_humanize: req.body.timestamp_humanize,
            group_id: req.body.group_id


        }
        let objParam: Parameters = { tbl: 'messages', orderBy: '', limit: 99999, filter: (msg: any) => { return msg("to").eq(messagesRequest.khonnect_id).or(msg("from").eq(messagesRequest.khonnect_id)).and(msg("showMeTo")) }, data: {} };
        Msgs.deleteMessages(objParam).then((resp) => {
            let stat: number = resp.ok ? 200 : 500
            res.status(stat).json(resp)
            metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || '' });
        }, (err: Error) => {
            res.status(500).json(err)
            metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
        })
    } catch (error) {
        console.log("Error al intentar eliminar mensajes:", error)
    }
}

const updateStatusMessages = (req: Request, res: Response) => {
    const metric: Function = httpReqDurationMicroSec.startTimer();
    let messagesRequest: MessagesRequest
    try {
        messagesRequest = {
            toAll: req.body.toAll ? req.body.toAll : false,
            khonnect_id: req.body.khonnect_id,
            to: req.body.khonnect_id,
            from: req.body.khonnect_id,
            showMeFrom: req.body.showMeFrom,
            readed: req.body.readed,
            message: req.body.message,
            timestamp: req.body.timestamp,
            showMeTo: req.body.showMeTo,
            timestamp_humanize: req.body.timestamp_humanize,
            group_id: req.body.group_id


        }
        let objParam: Parameters = { tbl: 'messages', orderBy: '', limit: 99999, filter: (msg: any) => { return msg("to").eq(messagesRequest.khonnect_id).or(msg("from").eq(messagesRequest.khonnect_id)).and(msg("showMeTo")) }, data: { "readed": messagesRequest.readed } };
        Msgs.messageStatus(objParam).then((resp) => {
            let stat: number = resp.ok ? 200 : 500
            res.status(stat).json(resp)
            metric({ route: req.url, code: stat, method: req.method, origin: req.headers.origin || '' });
        }, (err: Error) => {
            res.status(500).json(err)
            metric({ route: req.url, code: 500, method: req.method, origin: req.headers.origin || '' });
        })
    } catch (error) {
        console.log("Error al actualizar el status de los mensajes", error)
    }
}

const unreadedMessages = (req: Request, res: Response) => {
    const metric: Function = httpReqDurationMicroSec.startTimer();
    let messagesRequest: MessagesRequest
    try {

        messagesRequest = {
            toAll: req.body.toAll ? req.body.toAll : false,
            khonnect_id: req.body.khonnect_id,
            to: req.body.khonnect_id,
            from: req.body.khonnect_id,
            showMeFrom: req.body.showMeFrom,
            readed: req.body.readed,
            message: req.body.message,
            timestamp: req.body.timestamp,
            showMeTo: req.body.showMeTo,
            timestamp_humanize: req.body.timestamp_humanize,
            group_id: req.body.group_id


        }
        let objParam: Parameters = { tbl: 'messages', orderBy: '', limit: 99999, filter: (msg: any) => { return msg("to").eq(messagesRequest.khonnect_id).or(msg("from").eq(messagesRequest.khonnect_id)).and(msg("showMeTo")) }, data: { "readed": messagesRequest.readed } };
        Msgs.getUnreadMessages(objParam).then((resp) => {
            let stat: number = resp.ok ? 200 : 422
            res.status(stat).json(resp)
        })
    } catch (error) {
        console.log("Error en la priomesa", error)
    }

}

const getMyMessages = async (req: Request, res: Response) => {
    const metric: Function = httpReqDurationMicroSec.startTimer();
    let messagesRequest: MessagesRequest
    try {

        messagesRequest = {
            toAll: req.body.toAll ? req.body.toAll : false,
            khonnect_id: req.body.khonnect_id,
            to: req.body.to,
            from: req.body.from,
            showMeFrom: req.body.showMeFrom,
            readed: req.body.readed,
            message: req.body.message,
            timestamp: req.body.timestamp,
            showMeTo: req.body.showMeTo,
            timestamp_humanize: req.body.timestamp_humanize,
            group_id: req.body.group_id


        }
        await Msgs.getMyMessages(messagesRequest).then((resp) => {
            let stat: number = resp.ok ? 200 : 422
            res.status(stat).json(resp)
        })
    } catch (error) {
        console.log("Error en la priomesa", error)
    }

}

export default { getMessages, /* getPrivateMsgs, */ saveMessage, hideMessages, deleteMessages, updateStatusMessages, unreadedMessages, getMyMessages }