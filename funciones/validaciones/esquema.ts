const Ajv =  require('ajv')
let ajv = new Ajv({
    allErrors: true,
    strict: false
})
require('ajv-errors')(ajv)

const validar_parametros = (body_json: object, schema: object ) => {
    let detalles : Array<string> = []
    const valido =  ajv.validate(body_json, schema)
    if (!valido) {
        ajv.errors.forEach(function (error:any) {
            detalles.push(error.dataPath + " " + error.message);
        });
    }
    return valido ? body_json : {
        body_json,
        error: detalles
    };

}

export default validar_parametros