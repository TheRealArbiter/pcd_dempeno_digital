/**
 * Control de mensajes: guardar, obtener y eliminar
 */
import { IRequestBienesMovimientos } from '../interfaces/RequestBienesMovimientos.interface'
import { Responses } from "../interfaces/Response.interface"
import { SqlHelpers } from "../queries";
import { Parameters } from "../interfaces/Parameters.interface";
import { tblNames } from "../enums/tblName.enum";
import  HTTP_CODIGOS  from '../configs/codigos_http'
import moment from "moment";

export class Bienes {
    private static _instance: Bienes;
    private sqlHelper: SqlHelpers = SqlHelpers.getInstance();
    private moment = moment;

    constructor() {
        console.log(`${this.moment().format('YYYY-MM-DD HH:mm:ss')} -- Clase Bienes inicializada...`.grey(18));
    }

    static getInstance = (): Bienes => {
        if (!this._instance) {
            this._instance = new Bienes;
        }
        return this._instance;
    }

    /**
     *
     * @param tbl
     * @param param1
     * @returns
     */
    public getBienes = async (data: IRequestBienesMovimientos): Promise<Responses> => {
        let result: Responses = { ok:false, error: null,  msg: '', data: [] }
        let objData: Parameters = { tbl: tblNames.BIENESMOVIMIENTOS, schema: 'dbo', data: {}, limit: 10}
        await this.sqlHelper.getObject(objData).then((res) => {
            let bienes = <[]>res.data
            res.data = bienes
            result = { ...res }
        }, (err: Error) => {
            console.log('error en la promesa: ', err);
        });
        return result;
    }

    //     // /**
    //     //  * 
    //     //  * @param data 
    //     //  * @returns 
    //     //  */
    //     // public getPrivateMessage = async (data: MessagesRequest): Promise<Responses> => {
    //     //     let result: Responses = { error: null, ok: false, msg: '', desc: '', data: [] };
    //     //     let order: {column: string, mode: string} = {column: 'timestamp', mode: data.order || 'asc'};
    //     //     if(data.order != 'asc' && data.order != 'desc'){
    //     //         order.column == data.order
    //     //     }
    //     //     let objQuery: Parameters = { tbl: tblNames.MESSAGES, filter: (msg: any) => { return msg('from').eq(data.from).and(msg('to').eq(data.to)).and('showMeTo')}, orderBy: order.mode == 'asc' ? `'${order.column}'` : `r.desc('${order.column}')`, limit:99999, data:{}};
    //     //     await this.rethinkHelper.getObjectByFilter(objQuery).then(res => {
    //     //         let usrMsgs = <[]>res.data
    //     //         usrMsgs.sort((a: BaseMessage, b: BaseMessage) => {
    //     //         if(order.mode == 'asc'){
    //     //             return a.timestamp > b.timestamp && 1 || -1

    //     //         } else {
    //     //             return a.timestamp < b.timestamp && 1 || -1
    //     //         }
    //     //     });
    //     //     res.data = usrMsgs;
    //     //     result = { ...res };
    //     //     }, err => {
    //     //         console.log('error en la promesa: ', err);
    //     //     });
    //     //     return result;
    // }

}