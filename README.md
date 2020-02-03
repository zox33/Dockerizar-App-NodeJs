# Dockerizar una app de NodeJs con Dockerfile

## Creación y Configuración de base de datos en la nube.
### 1. Debido a que se usa MongoDb tendremos que darnos de alta en el siguiente [enlace](https://www.mongodb.com/cloud/atlas).

### 2. Podeis ver este [tutorial](https://www.oscarblancarteblog.com/2018/07/24/mongodb-atlas-database-as-a-service/) para saber como configurar la base de datos en la nube.

## Dockerización

### 1. Lo primero es abrir nuestro proyecto y en la raiz del mismo crear un DockerFile con el siguiente código.

~~~~
# Se indica la imagen base.
FROM node:latest

# Crea un directorio de la app
WORKDIR /usr/src/app

COPY package*.json ./

# Instalación de las dependencias
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "./bin/www" ]
~~~~

### 2. Creamos un .dockerignore tambien en la raiz del proyecto y metemos lo siguiente dentro del archivo.

~~~~
node_modules
npm-debug.log
~~~~

### 3. Ahora desde la raiz de la app abrimos nuestra consola y creamos la imagen a apartir del dockerfile.

~~~~
docker build -t <nombreUsuario>/grupo1-trianaweather .
~~~~

### 4. Por último, ya creada la imagen vamos a crear el contenedor de docker.

~~~~
docker run --name <nombreDelContenedor> -p 8020:3000 -d <nombreUsuario>/grupo1-trianaweather
~~~~