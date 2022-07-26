import { JSONSchemaType } from "ajv"
import { IBitacoraLiquidacion } from "../interfaces/BitacoraLiquidacion.interface"


const BitacoraLiquidacionSchema : JSONSchemaType<IBitacoraLiquidacion> = {
    type: "object",
    properties: {
        IdSucursal: {type: "integer" , nullable: false},
        NroOperacion: {type: "integer", nullable: false},
        IdCliente: {type: "integer", nullable: false},
        MarcaModeloDisp: {type: "string", nullable: true},
        SODisp: {type: "string", nullable: true},
        SOVersionDisp: {type: "string", nullable: true},
        APPVersionDisp: {type: "string", nullable: true},
        UUIDDisp: {type: "string", nullable: true},
        FechaLiquidacion: {type: "string", nullable: false},
        UsuarioFirmado: {type: "string", nullable: true},
    },
    required: [
        "IdSucursal",
        "NroOperacion",
        "IdCliente",
        "FechaLiquidacion"
    ],
    errorMessage : {
        type: "El dato de entrada debe ser un objeto",
        properties: {
            IdSucursal: "El dato debe ser de tipo entero",
            NroOperacion: "El dato debe ser de tipo entero",
            IdCliente: "El dato debe ser de tipo entero",
            MarcaModeloDisp: "El dato debe ser un tipo cadena o string",
            SODisp: "El dato debe ser un tipo cadena o string",
            SOVersionDisp: "El dato debe ser un tipo cadena o string",
            APPVersionDisp: "El dato debe ser un tipo de cadena o string",
            UUIDDisp: "El dato debe ser un tipo de cadena o string",
            FechaLiquidacion: "El dato debe ser una fecha en formato YYYY/MM/DD",
            UsuarioFirmado: "El dato debe ser un tipo de cadena o string"
        },
        required: {
            IdSucursal: "El dato es requerido",
            NroOperacion: "El dato es requerido",
            IdCliente: "El dato es requerido",
            FechaLiquidacion: "El dato es requerido"
        }
    }
}

export default  { BitacoraLiquidacionSchema }