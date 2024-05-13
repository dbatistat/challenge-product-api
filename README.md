# Challenge Product API

## Descripción

Este proyecto es una prueba tecnica

### Caracteristicas

- Base de datos Mysql
- Seguridad en end points con JWT
- Envio de email para restablecer contraseña, con el servicio de [Emailjs](https://www.emailjs.com/)
- Modulo de authenticacion
- Modulo de usuarios
- Encriptado de contraseña de usuario
- Modulo de productos
- Open APi con Swagger

## Instalación

```bash
$ npm install
```

## Inicializar App

- Crear una base de datos en `Mysql`
- Renombrar el archivo `.env-example` a `.env`
- Cambiar la configuracion de la base de datos en el archivo `.env`
- Se recomienda usar las variables de configuración del archivo `.env-example`
- Iniciar el proyecto con el comando `npm run start:dev`
- Para tener productos de prueba, ejecutar el script de sql que esta en el archivo `script.sql`

## Swagger

- Para ver y realizar prueba de los servicios, entrar a la ruta `http://localhost:3000/api`

## Por mejorar

- Añadir validaciones de end points en DTO
- Agregar migraciones automaticas para evitar el uso de scripts
- Agregar la configuración de integracion continua
- Agregar un modulo de logs para registrar los eventos del sistema
- Mejorar las excepciones para tener un mejor control sobre los eventos del sistema
