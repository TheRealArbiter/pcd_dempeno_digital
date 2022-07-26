/**
 * Clase para obtener, manipular y agregar información a SQL...
 */
import sql, { IResult, MSSQLError } from 'mssql';

import { SQLDB_CONFIG } from '../configs';
import { Responses } from '../interfaces/Response.interface';
import { Parameters } from '../interfaces/Parameters.interface';
import moment from 'moment';

let conn: sql.ConnectionPool;
export class SqlHelpers {
    private static _instance: SqlHelpers;
    private server: string = SQLDB_CONFIG.SQL_SERVER;
    private user: string | undefined = SQLDB_CONFIG.SQL_USER;
    private password: string | undefined = SQLDB_CONFIG.SQL_PASS;
    private db: string = SQLDB_CONFIG.SQL_DB;
    private Conn: sql.ConnectionPool = conn
    private moment = moment;

    constructor() {
        let optionsConn : sql.config = {
            server: this.server,
            user: this.user,
            password: this.password,
            database: this.db,
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        }
        let dbConn = new sql.ConnectionPool(optionsConn)

        console.log(`${this.moment().format('YYYY-MM-DD HH:mm:ss')} -- Clase SqlHelpers iniciaizada...`.grey(18));
        dbConn.connect().then(pool => {
            if (pool.connected) {
                console.log(`${this.moment().format('YYYY-MM-DD HH:mm:ss')} Conexión establecida con éxito... verificando BD...`.green);
                this.Conn = pool;
            }else{
                console.log(`${this.moment().format('YYYY-MM-DD HH:mm:ss')} error al intentar la conexión...`, this.server, pool);

            }
        });
    }

    /**
     * Método para instanciar...
     * @returns
     */
    static getInstance = (): SqlHelpers => {
        if (!this._instance) {
            this._instance = new SqlHelpers;
        }
        return this._instance;
    }

     /**
     * Función genérica para obtener un objeto con un filtro en particular a partir de un objeto con las siguientes propiedades.
     * @param tbl tabla en la que buscar
     * @param filter filtro de tipo {_id: objId, ...} o (item) => {}
     * @param orderBy parámetro con la columna por la cual hacer el ordenado de la info
     * @param limit parámetro para limitar la cantidad de resultados.
     * @param data no aplica en consultas de información.
     * @returns Promesa con una respuesta de tipo Responses.
     */
    public getObject = async (params:Parameters): Promise<Responses> => {
        // se valida conexión establecida a la BD
        if (this.Conn && this.Conn.connected) {
            // se verifica que se haya definido la tabla en el objeto params
            if (params.tbl) {
                // se muestra la consulta en pantala para control.
                console.log(`${this.moment().format('YYYY-MM-DD HH:mm:ss')} GET: this.Conn.query(SELECT * FROM ${params.tbl})`.grey(5));
                // se declara la variable que contendrá la respuesta con la data.
                let resp: Responses = { ok: false,  error: null, msg: '', data: [] };
                // se realiza la consulta con los parámetros proporcionados.
                if (params.limit) {
                    let top = params.limit
                    await this.Conn.query(`SELECT TOP(${params.limit}) *  FROM ${params.tbl}`).then((result) => {
                        //  Se verifica que no haya errores y se agrega la data a la respuesta en su respectiva propiedad como objeto si la propiedad limit viene en 1 o como arreglo en cualquier otro caso
                        if(result) resp.data = result?.recordset
                        resp.ok = true
                        resp.error = null
                        resp.msg = 'Éxito! ID: ' + JSON.stringify(params.tbl) + JSON.stringify(params.schema)
                    }).catch(Error => {
                        resp.ok = !Boolean(Error) ?? Error
                        // // se establecen en el resto de las propiedades sus valores correspondientes según sea el caso
                        resp.error = !Boolean(Error) ? null : Error
                        resp.msg = !Boolean(Error) ? 'Éxito! ID: ' + JSON.stringify(params.tbl) : 'Error ID: ' + JSON.stringify(params.schema)
                    });
                }else{
                    await this.Conn.query(`SELECT *  FROM ${params.tbl}`).then((result) => {
                        //  Se verifica que no haya errores y se agrega la data a la respuesta en su respectiva propiedad como objeto si la propiedad limit viene en 1 o como arreglo en cualquier otro caso
                        if(result) resp.data = result?.recordset
                    }).catch(Error => {
                        resp.ok = !Boolean(Error) ?? Error
                        // // se establecen en el resto de las propiedades sus valores correspondientes según sea el caso
                        resp.error = !Boolean(Error) ? null : Error
                        resp.msg = !Boolean(Error) ? 'Éxito! ID: ' + JSON.stringify(params.tbl) : 'Error ID: ' + JSON.stringify(params.schema)
                    });
                }
                //  se retorna el objeto de tipo response
                return resp;
            } else {
                // de no ser proporcionada la tabla se establecen las propiedades con sus respectivos valores informando al usuario la ausencia de la tabla.
                return { ok: false,  error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.schema)}`, data: [] };
            }
        } else {
            // si no existe una conexión a la BD abierta se establecen las propiedades con sus respectivos valores informando de la ausencia de la conexión a la BD.
            return { ok:false, error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.schema)}`, data: [] };
        }
    }

    /**
     * Función genérica para obtener un objeto con un filtro en particular a partir de un objeto con las siguientes propiedades.
     * @param tbl tabla en la que buscar
     * @param filter filtro de tipo {_id: objId, ...} o (item) => {}
     * @param orderBy parámetro con la columna por la cual hacer el ordenado de la info
     * @param limit parámetro para limitar la cantidad de resultados.
     * @param data no aplica en consultas de información.
     * @returns Promesa con una respuesta de tipo Responses.
     */
    // public getObjectByFilter = async (params: Parameters): Promise<Responses> => {
    //     // se valida conexión establecida a la BD
    //     if (this.Conn && this.Conn.connected) {
    //         // se verifica que se haya definido la tabla en el objeto params
    //         if (params.tbl) {
    //             // se muestra la consulta en pantala para control.
    //             console.log(`${this.moment().format('YYYY-MM-DD HH:mm:ss')} GET: r.db(${this.db}).table(${params.tbl}).filter(${typeof params.filter == 'function' ? params.filter : JSON.stringify(params.filter)}).orderBy(${params.orderBy}).limit(${params.limit})`.grey(5));
    //             // se declara la variable que contendrá la respuesta con la data.
    //             let resp: Responses = { ok: true, error: null, msg: '', desc: '', data: [] };
    //             // se realiza la consulta con los parámetros proporcionados.
    //             await r.db(this.db).table(params.tbl).filter(params.filter).orderBy(params.orderBy).limit(params.limit).run(this.Conn, (err: Error, res: r.Cursor) => {
    //                 //  Se verifica que no haya errores y se agrega la data a la respuesta en su respectiva propiedad como objeto si la propiedad limit viene en 1 o como arreglo en cualquier otro caso
    //                 !Boolean(err) && res.toArray((err: Error, data: any[]) => { resp.data = params.limit == 1 ? data[0] : data; })
    //                 // se establecen en el resto de las propiedades sus valores correspondientes según sea el caso
    //                 resp.ok = !Boolean(err)
    //                 resp.error = !Boolean(err) ? null : err
    //                 resp.msg = !Boolean(err) ? 'Éxito! ID: ' + JSON.stringify(params.filter) : 'Error ID: ' + JSON.stringify(params.filter)
    //                 resp.desc = !Boolean(err) ? '' : err.message

    //             });
    //             //  se retorna el objeto de tipo response
    //             return resp;
    //         } else {
    //             // de no ser proporcionada la tabla se establecen las propiedades con sus respectivos valores informando al usuario la ausencia de la tabla.
    //             return { ok: false, error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.filter)} order: ${params.orderBy} limit: ${params.limit}`, desc: 'Parámetros incompletos... por favor, verifique...', data: [] };
    //         }
    //     } else {
    //         // si no existe una conexión a la BD abierta se establecen las propiedades con sus respectivos valores informando de la ausencia de la conexión a la BD.
    //         return { ok: false, error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.filter)} order: ${params.orderBy} limit: ${params.limit}`, desc: 'Sin Conexión a RethinkDB...', data: [] };
    //     }
    // }

    /**
     * Función genérica para crear un registro en la BD a partir de un objeto con las siguientes propiedades.
     * @param tbl tabla en la que agregar el registro
     * @param filter filtro de tipo {_id: objId, ...} o (item) => {}, no aplica para insertar un registro.
     * @param orderBy parámetro con la columna por la cual hacer el ordenado de la info, no aplica para insertar un registro
     * @param limit no aplica para insertar un registro.
     * @param data Contiene la Data a almacenar
     * @returns Promesa con una respuesta de tipo Responses.
     */
    // public createtObject = async (params: Parameters): Promise<Responses> => {
    //     // Se verifica la conexión a la BD
    //     if (this.Conn.open) {
    //         // se verifica que se haya definido la tabla en el objeto params
    //         if (params.tbl) {
    //             // se muestra la consulta en pantala para control.
    //             console.log(`${this.moment().format('YYYY-MM-DD HH:mm:ss')} ADD: r.db(${this.db}).table(${params.tbl}).insert(${JSON.stringify(params.data)}, { returnChanges: true })`.grey(5));
    //             // se declara la variable que contendrá la respuesta con la data.
    //             let resp: Responses = { ok: true, error: null, msg: '', desc: '', data: [] };
    //             //  Se realiza la inserción con los datos proporcionados...
    //             await r.db(this.db).table(params.tbl).insert(params.data, { returnChanges: true }).run(this.Conn, (err: Error, res: any) => {
    //                 //  se establecen los respectivos valores en las propiedades del objeto responses considerando si hubo o no un error... 
    //                 resp.ok = Boolean(res?.inserted);
    //                 resp.error = !Boolean(err) ? null : err;
    //                 resp.msg = !Boolean(err) ? 'Éxito! ID: ' + JSON.stringify(params.filter) : 'Error ID: ' + JSON.stringify(params.filter);
    //                 resp.desc = !Boolean(err) ? '' : err.message;
    //                 resp.data = !Boolean(err) ? res.changes[0].new_val : [];
    //             });
    //             return resp;
    //         } else {
    //             // de no ser proporcionada la tabla se establecen las propiedades con sus respectivos valores informando al usuario la ausencia de la tabla.
    //             return { ok: false, error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.filter)} order: ${params.orderBy} limit: ${params.limit}`, desc: 'Parámetros incompletos... por favor, verifique...', data: [] };
    //         }
    //     } else {
    //         // si no existe una conexión a la BD abierta se establecen las propiedades con sus respectivos valores informando de la ausencia de la conexión a la BD.
    //         return { ok: false, error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.filter)} order: ${params.orderBy} limit: ${params.limit}`, desc: 'Sin Conexión a RethinkDB...', data: [] };
    //     }
    // }

    /**
     * Función genérica para actualizar un objeto obcionalmente con un filtro en particular a partir de un objeto con las siguientes propiedades.
     * @param tbl tabla en la que a actualizar el registro
     * @param filter filtro de tipo {_id: objId, ...} o (item) => {}.
     * @param orderBy parámetro con la columna por la cual hacer el ordenado de la info, no aplica para actualizar un registro.
     * @param limit parámetro para limitar la cantidad de resultados, no aplica para actualizar un registro.
     * @param data los datos a actualizar del registro, que pueden ser un objeto con sus respectivos valores hasta el registro completo.
     * @returns Promesa con una respuesta de tipo Responses.
     */
    // public updateObject = async (params: Parameters): Promise<Responses> => {
    //     // Se verifica la conexión a la BD
    //     if (this.Conn.open) {
    //         // se verifica que se haya definido la tabla en el objeto params
    //         if (params.tbl) {
    //             // se muestra la consulta en pantala para control.
    //             console.log(`${this.moment().format('YYYY-MM-DD HH:mm:ss')} UPD: r.db(${this.db}).table(${params.tbl}).filter(${typeof params.filter == 'function' ? params.filter : JSON.stringify(params.filter)}).update(${JSON.stringify(params.data)})`.grey(5));
    //             // se declara la variable que contendrá la respuesta con la data.
    //             let resp: Responses = { ok: true, error: null, msg: '', desc: '', data: [] };
    //             //  Se realiza la actualización con los datos proporcionados...
    //             await r.db(this.db).table(params.tbl).filter(params.filter).update(params.data, { returnChanges: true }).run(this.Conn, (err: Error, res: any) => {
    //                 // se establecen los respectivos valores en las propiedades del objeto responses considerando si hubo o no un error... 
    //                 resp.ok = !Boolean(err)
    //                 resp.error = !Boolean(err) ? null : err
    //                 resp.msg = !Boolean(err) ? 'Éxito! ID: ' + JSON.stringify(params.filter) : 'Error ID: ' + JSON.stringify(params.filter)
    //                 resp.desc = !Boolean(err) ? '' : err.message
    //                 resp.data = !Boolean(err) && res.changes != undefined ? res.changes[0] && res.changes[0].new_val : []
    //             });
    //             return resp;
    //         } else {
    //             // de no ser proporcionada la tabla se establecen las propiedades con sus respectivos valores informando al usuario la ausencia de la tabla.
    //             return { ok: false, error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.filter)} order: ${params.orderBy} limit: ${params.limit}`, desc: 'Parámetros incompletos... por favor, verifique...', data: [] };
    //         }
    //     } else {
    //         return { ok: false, error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.filter)} order: ${params.orderBy} limit: ${params.limit}`, desc: 'Sin Conexión a RethinkDB...', data: [] };
    //     }
    // }

    /**
     * Función genérica para crear un registro en la BD a partir de un objeto con las siguientes propiedades.
     * @param tbl tabla en la que se desea eliminar el registro
     * @param filter filtro de tipo {_id: objId, ...} o (item) => {}.
     * @param orderBy parámetro con la columna por la cual hacer el ordenado de la info, no aplica para eliminar un registro
     * @param limit no aplica para eliminar un registro.
     * @param data no aplica para eliminar un registro.
     * @returns Promesa con una respuesta de tipo Responses.
     */
    // public deleteObject = async (params: Parameters): Promise<Responses> => {
    //     // Se verifica la conexión a la BD
    //     if (this.Conn.open) {
    //         // se verifica que se haya definido la tabla en el objeto params
    //         if (params.tbl) {
    //             // se muestra la consulta en pantala para control.
    //             console.log(`${this.moment().format('YYYY-MM-DD HH:mm:ss')} DEL: r.db(${this.db}).table(${params.tbl}).filter(${typeof params.filter == 'function' ? params.filter : JSON.stringify(params.filter)})`.grey(5));
    //             // se declara la variable que contendrá la respuesta con la data.
    //             let resp: Responses = { ok: true, error: null, msg: '', desc: '', data: [] };
    //             //  Se realiza la eliminación con los datos proporcionados...
    //             await r.db(this.db).table(params.tbl).filter(params.filter).delete().run(this.Conn, (err: Error, res: r.WriteResult) => {
    //                 //  se establecen los respectivos valores en las propiedades del objeto responses considerando si hubo o no un error... 
    //                 resp.ok = !Boolean(err);
    //                 resp.error = !Boolean(err) ? null : err;
    //                 resp.msg = !Boolean(err) ? 'Éxito! ID: ' + JSON.stringify(params.filter) : 'Error ID: ' + JSON.stringify(params.filter);
    //                 resp.desc = !Boolean(err) ? '' : err.message;
    //                 resp.data = !Boolean(err) ? res.deleted : [];
    //             });
    //             return resp
    //         } else {
    //             // de no ser proporcionada la tabla se establecen las propiedades con sus respectivos valores informando al usuario la ausencia de la tabla.
    //             return { ok: false, error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.filter)} order: ${params.orderBy} limit: ${params.limit}`, desc: 'Parámetros incompletos... por favor, verifique...', data: [] };
    //         }
    //     } else {
    //         return { ok: false, error: null, msg: `tabla*: ${params.tbl} filter*: ${JSON.stringify(params.filter)} order: ${params.orderBy} limit: ${params.limit}`, desc: 'Sin Conexión a RethinkDB...', data: [] };
    //     }
    // }

}
