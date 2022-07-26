export interface IBitacoraLiquidacion {
    IdSucursal: number,
    NroOperacion: number,
    IdCliente: number,
    MarcaModeloDisp?: string,
    SODisp?: string,
    SOVersionDisp?: string,
    APPVersionDisp?: string,
    UUIDDisp?: string,
    FechaLiquidacion: string,
    UsuarioFirmado?: string
}