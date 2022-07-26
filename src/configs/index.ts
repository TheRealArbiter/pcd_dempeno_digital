/**
 * Configuraciones Generales y variables de entorno
 */
import desencriptar from '../../funciones/utilerias/desencriptar'
import  conexion from './conexion.json';
const environment_config = conexion['conexion']
const DEV = process.env.NODE_ENV == 'true' ? true : false;
export const API_PREFX = process.env.API_PREFX || 'app-prendaria'
export const API_VER = process.env.API_VER || '1'
// export const APIPORT = DEV ? 8080 : process.env.PORT || 8080
export const APIPORT = '8080'
export const GRALIP = process.env.IP || 'localhost'

/**
 * DB Config
 */
export const SQLDB_CONFIG = {
    // SQL_SERVER: DEV ? /* '54.219.228.138' */ '127.0.0.1' : process.env.SQL_HOST || '172.32.50.13',
    SQL_SERVER: process.env.ENV_SERVER_LAKIN || environment_config.database_config_mssql.server,
    SQL_USER: desencriptar(process.env.ENV_USER_PRENDARIO_LAKIN || environment_config.database_config_mssql.user),
    SQL_PASS: desencriptar(process.env.ENV_PASS_PRENDARIO_LAKIN || environment_config.database_config_mssql.password),
    SQL_DB: desencriptar(process.env.ENV_BASE_LAKIN || environment_config.database_config_mssql.database),
}
