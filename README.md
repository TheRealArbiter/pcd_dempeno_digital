> **BACKEND PARA EL CHAT DE ISYSA**
> =

#

## - Implementación con SocketIO y RedisAdapter.

Puerto externo para recibir conexiones: 3000

Puerto para conexión a Redis: 6379

>
>

#

## - Implementación de API-RES para consultas a rethink y otros servicios.

Puerto externo para recibir peticiones: 3010

Puerto para conexión a RethinkDB: 28015

>
>

#

## - Set de librerías usadas:

* NodeJS 16.13.2
* TypeScript 4.5.2
* Socket.&#65279; IO 4.3.1
* RethinkDB 2.4.2
* Redis 3.1.2
* Morgan 1.10.0
* Moment 2.29.1
* socket.io-prometheus-metrics 1.0.6

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

#

# - Errores Conocidos:

## Prometheus Metrics error Object.key over undefined property nsps

En la versión del exporter para prometheus usada en éste desarrollo implementado en Socket.&#65279; IO, se usa una
funcionalidad que establece un búsqueda cada determinado tiempo de los espacios de nombre que pueden crear en
Scoket.&#65279;IO, para ello combierte una propiedad de la clase SocketIo llamada **nsps** en un arreglo de objetos que
recorre para integrar las métricas; sin embargo, en la versión usada de socketIO ésa propiedad se renombró a **_nsps**.
Por tanto, se hace la corrección concecuente en el archivo: node_modules/socket.io-prometheus-metrics/dist/index.js

---
# - API
**Usuarios:**  
/users/  
/userStatus/  
/getUser/  
/addUser/  
/updateUser/  
  
**Mensajes**  
/myMessages/  
/getMessages/  
/addMessages/  
/hideMessages/  
/deleteMessages/  
/updateStatusMessages/  

**Grupos**  
/chat/groups/  
/chat/create-group/  
/chat/update-group/  
/chat/delete-group/  
/update-groups-members/  
  
  
# Eventos:
addMe  
privateMessage  
message  
writing  
msgReaded

---
dominios demo en kiubertocloud:  
API: https.&#65279;://isysa.social.hiumanlab.com:8009  
WSS: https.&#65279;://isysa.social.hiumanlab.com:8010  
---
>
>
> <div style="text-align: right">RBM, LGC, RSG</div>
> &copy; 2022 &reg; HiumanLab&trade; Development Ver 2.1.0  
