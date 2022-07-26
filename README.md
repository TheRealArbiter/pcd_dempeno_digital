> **BACKEND PARA SERVICIOS **
> 

#

## - Set de librerías usadas:

* NodeJS 16.13.2
* TypeScript 4.5.2
* Morgan 1.10.0
* Moment 2.29.1

>
>

#

## - Para correr en modo desarrollo (o modo local) use en consola:

```
$ export DEV=true
$ npm run dev
```

>
>

#
## - Métricas
Para acceder a las métricas de SocketIO use:  
http&#65279;://dominio:9090/metrics  
para acceder a las métricas de la API use:  
https&#65279;://dominio_por_defecto:puerto_por_defecto/metrics  
  
---
**NOTA**  
##### Para mantener consistencia en las métricas, cada petición que se haga a la API debe incluir el encabezado "origin", con su respectivo valor, en los formatos y estándares establecidos
---

>
>  

#

#### **- Variables de entorno admitidas (valor por defecto en desarrollo/producción):**

**DEV** Se usa para correr la aplicación en modo desarrollo o modo local con el comando *npm run dev* (por defecto
true/false)  
**PORT** Se usa para determinar el puerto en el que será accesible la API (por defecto 3010/3020).  
**CHATPORT** Se usa para determinar el puerto en el que será accesible el WebSocket o socket.&#65279; io (por defecto
3000/3010)  
**GRALIP** Se usa para restringir la IP en la que se establecerá el puerto de escucha (por defecto '0.0.0.0'/'
127.0.0.1')  
**API_VER**  Versionado de la API.  
**API_PREFX** Path inicial de la API. Valor por defecto 'api'  
**RDB_PORT** Se usa para establecer el puerto en el que está el servidor RethinkDB (por defecto 28015/28015)  
**RDB_HOST** Se usa para establecer el host en el que está el servidor RethinkDB (por defecto '127.0.0.1'/'
172.32.50.13')  
**RDB_USER** Se usa para establecer el usuario con el que se accederá a la BD en RethinkDB (por defecto ''/'')  
**RDB_PASS** Se usa para establecer la constraseña con el que se accederá a la BD en RethinkDB (por defecto ''/'')  
**RDB_DB** Se usa para establecer el nombre de la BD en la que se guardarán las colecciones en la BD de RethinkDB (por
defecto 'isysa'/'isysa')  
**REDIS_HOST** Se usa para establecer el host en el que está instalado el servidor Redis (por defecto '127.0.0.1'/'
172.32.50.13')  
**REDIS_PORT** Se usa para establecer el puerto en el que se accederá al servidor Redis (por defecto 6379/6379)


>
>



---
# - API


  

---
}
>
>
> <div style="text-align: right">RBM, LGC, RSG</div>
> &copy; 2022 &reg; HiumanLab&trade; Development Ver 2.1.0  
