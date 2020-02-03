# README #

Proyecto TrianaWeather Grupo 1 2ºDAM

### Comandos al clonar el repositorio ###

* npm i para instalar el node_modules
* npm i morgan --save para instalar morgan
* npm start para arrancar el proyecto

### Reparto de tareas ###

* Creación de modelos (Víctor y Miguel)
* Gestíon de usuarios (Víctor)
* Gestion estaciones meteorológicas 'Tres primeras' (Miguel)
* Gestion estaciones meteorológicas 'Dos últimas' (Juan Antonio)
* Gestion datos meteorológicos 'Tres primeras' (Terrero)
* Gestion datos meteorológicos 'Cuarta' (Juan Antonio)
* Gestion datos meteorológicos 'Dos últimos' (Miguel)
* Documentacion (Prueba del proyecto) (Juan Antonio y Miguel)

# PRUEBA DEL PROYECTO #
## GESTION DE USUARIOS ##
### REGISTRO DE USUARIOS ###

#### Realizado por Víctor  
Primero nos registraremos en la api con la siguiente peticion   
##### POST localhost:3000/api/register   
Pasandole como cuerpo de la peticion los siguientes usuarios

```json {	 
            "_id": "1",
			"fullname": "admin",
            "email": "admin@admin",
            "username": "admin",
            "role": "ADMIN",
            "password": bcrypt.hashSync("12345", parseInt(process.env.BCRYPT_ROUNDS)),
            "EstacionesRegistros":[],
            "EstacionesMantenimiento":[]
        }
```

```json {
            "_id": "2",
			"fullname": "usuario",
            "email": "usuario@usuario",
            "username": "usuario",
            "role": "USER",
            "password": bcrypt.hashSync("12345", parseInt(process.env.BCRYPT_ROUNDS)),
            "EstacionesRegistros":[],
            "EstacionesMantenimiento":[]
        }
```
```json {
            "_id": "3",
			"fullname": "manager",
            "email": "manager@manager",
            "username": "manager",
            "role": "MANAGER",
            "password": bcrypt.hashSync("12345", parseInt(process.env.BCRYPT_ROUNDS)),
            "EstacionesRegistros":[],
            "EstacionesMantenimiento":[]
        }
```   

La petición devolvera un 201 y los datos del usuario creado  

### LOGIN ###
#### Realizado por Víctor 
Petición con la que obtendremos el token necesario para realizar las peticiones que necesiten autorización.  
##### POST localhost:3000/api/register 
Pasandole como cuerpo de la petición   

* {"username":"manager","password":"12345"} 

La peticion devolera un 200 y el token necesario  

### VER TODOS LOS USUARIOS ###
#### Realizado por Víctor ####
Petición con la que obtendremos todos los usuarios que haya registrados.  
##### GET localhost:3000/api/users
La peticion devolera un 200 y la lista de usuarios


## GESTION DE ESTACIONES ##

### REGISTRAR ESTACION ###
#### Realizado por Miguel ####
Petición con la que registraremos una estación
##### POST localhost:3000/api/stations #####
Pasandole como cuerpo a la peticion: 

* {
    "_id" : "1",
    "id" : 1,
	"nombre":"Estacion 1"
    "localizacion" : "1269,235",
    "usuarioMantiene": "2",
	}
* {  "_id" : "1",
    "id" : 1,
	"nombre":"Estacion 2"
    "localizacion" : "1269,235",
    "usuarioMantiene": "2",}
	
La petición devolverá un 201 y los datos de la estación creada


### VER ESTACIONES ###
#### Realizado por Miguel ####
Petición con la que registraremos una estación
##### GET localhost:3000/api/stations #####
La petición devolverá un 200 y los datos de la estaciones

### VER ESTACION ###
#### Realizado por Miguel ####
Petición con la que veremos la información de una estación
##### GET localhost:3000/api/stations/1 #####
La petición devolverá un 200 y los datos de la estación con id 1

### EDITAR ESTACION ###
#### Realizado por Juan Antonio ####
Petición con la que editaremos una estación
##### PUT localhost:3000/api/stations/1 #####
Pasandole como cuerpo a la peticion: 

* {
    "_id" : "1",
    "id" : 1,
	"nombre":"Estacion editada"
    "localizacion" : "1269,235",
    "usuarioMantiene": "2",
	}
	
La petición devolverá un 200 y los datos de la estación modificada

### BORRAR ESTACION ###
#### Realizado por Juan Antonio ####
Petición con la que borraremos una estación
##### DELETE localhost:3000/api/stations/2 #####
La petición devolverá un 204

## GESTIÓN DE DATOS METEOROLÓGICOS ##
### REGISTRAR DATOS ###
#### Realizado por Terrero ####
Petición con la que añadires una nueva entrada de datos meteorológicos a una estación
##### POST localhost:3000/api/weather #####
Pasandole como cuerpo a la petición   

* {
            "_id":"1"
			"lluvia": 1,
            "velocidadViento": 1,
            "direccion": 1,
            "temperatura": 1,
            "humedad": 1,
            "calidadAire": 1,
            "presion": 1,
            id_Estacion: "1"
        }

La petición devolvera un 201 y los datos de la entrada creada

### OBTENER ENTRADA DE DATOS POR ID ###
#### Realizado por Terrero ####
Petición con la que obtendremos la cata de datos mediante el id de la entrada
##### GET localhost:3000/api/weather/1 #####
La petición devolvera un 200 y los datos de la entrada 

### OBTENER DATOS DE UNA ESTACION ###
#### Realizado por Terrero ####
Petición con la que obtendremos todos los datos de una estacion
##### GET localhost:3000/api/stations/1/weather #####

La petición devolvera un 200 y las entradas de las estación

### OBTENER DATOS DE HOY ###
#### Realizado por Juan Antonio ####
Petición con la que obtendremos los datos de hoy
##### GET localhost:3000/api/weather/today #####

La petición devolvera un 200 y las entradas de hoy

### OBTENER DATOS DE UNA ESTACION EN UN PERIODO DE TIEMPO ###
#### Realizado por Miguel ####
Petición con la que obtendremos los datos de una estación en un periodo de tiempo
##### GET  localhost:3000/api/stations/1/weather/from/:from/to/:to #####
Para que obtenga resultados aconsejamos introducir como :from la fecha del día en la que realiza la prueba  
con el siguiente formato (dd-mm-yyyy) y en el :to una fecha posterior.   

La petición devolvera un 200 y las entradas de esa estación en ese periodo de tiempo

### OBTENER DATOS EN UN PERIODO DE TIEMPO ###
#### Realizado por Miguel ####
Petición con la que obtendremos los datos wn un periodo de tiempo
##### GET  localhost:3000/api/weather/from/:from/to/:to #####
Para que obtenga resultados aconsejamos introducir como :from la fecha del día en la que realiza la prueba  
con el siguiente formato (dd-mm-yyyy) y en el :to una fecha posterior.   

La petición devolvera un 200 y las entradas  en ese periodo de tiempo

