export default HTTP_CODIGOS = {
    _201:{
        'estatus':201,
        'contexto':{
            _000:{
                'codigo':'000',
                'mensaje':'Operación exitosa'
            }
        }
    },
    _400:{
        'estatus':400,
        'contexto':{
            _010:{
                'codigo':'010',
                'mensaje':'Cabeceras inválidas'
            },
            _011:{
                'codigo':'011',
                'mensaje':'Esquema inválido'
            }
        }
    },
    _500:{
        'estatus':500,
        'contexto':{
            _100:{
                'codigo':'100',
                'mensaje':'Error en consulta a base de datos'
            },
            _101:{
                'codigo':'101',
                'mensaje':'Error al ejecutar proceso'
            }
        }
    }
}
