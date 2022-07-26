import {JSONSchemaType} from "ajv"
import { IBienesMovimientos } from "../interfaces/BienesMovimientos.interface"


const BienesMovimientosSchema : JSONSchemaType<IBienesMovimientos> = {
    type: "object",
    properties: {
        NroBien: {type: "string" , nullable: true},
        BienMovimientoRenglon: {type: "integer", nullable: false},
        Fecha: {type: "string", nullable: false},
        IdUsuarioAlta: {type: "string", nullable: false},
        IdSucursalOrigen: {type: "string", nullable: false},
        IdUsuarioUltModif: {type: "string", nullable: false},
        FechaUltModif: { type:"string", nullable:false},
        IngresoEgreso: { type:"string", nullable:false},
        Observaciones: { type:"string", nullable:false},
        IDSISTEMA: { type:"string", nullable:false}
      },
      required: [
        "BienMovimientoRenglon",
        "Fecha",
        "IdUsuarioAlta",
        "IdSucursalOrigen",
        "IdUsuarioUltModif",
        "FechaUltModif",
        "IngresoEgreso",
        "IDSISTEMA"
    ],
    errorMessage : {
        type: "El dato de entrada debe ser un objeto",
        properties: {
            BienMovimiento: "El dato debe ser tipo cadena o string",
            IdUsuarioAlta: "El dato debe ser un tipo cadena o string",
            IdSucursalOrigen: "El dato debe ser un tipo cadena o string",
            IdUsuarioUltModif: "El dato debe ser un tipo cadena o string",
            IngresoEgreso: "El dato debe ser un tipo cadena o string",
            Observaciones: "El dato debe ser un tipo cadena o string",
            IDSISTEMA: "El dato debe ser un tipo de cadena o string"
        },
        required: {
            BienMovimiento: "El dato es requerido",
            Fecha: "El dato es requerido",
            IdUsuarioAlta: "El dato es requerido",
            IdSucursalOrigen: "El dato es requerido",
            IdUsuarioUltModif: "El dato es requerido",
            IngresoEgreso: "El dato es requerido",
            Observaciones: "El dato es requerido",
            IDSISTEMA: "El dato es requerido"
        }
    }
}

export default  { BienesMovimientosSchema  }