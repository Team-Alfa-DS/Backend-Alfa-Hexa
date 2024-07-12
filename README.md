# Bienvenidos a Gymnastic Center Alfa

![logo](https://github.com/user-attachments/assets/e5e468f3-1973-40a4-ac80-9cac06e813f0)

Repositorio Backend de la app Gymnastic Center del equipo Alfa. Esta aplicacion posee contenido como cursos y blogs sobre yoga. Todas las funcionalidades vienen dadas por nuestra API desarrollada en Nestjs.

# Arquitectura

Nuestra aplicación Backend utiliza varias arquitecturas y patrones de diseño que garantizan la mantenibilidad, escalabilidad y eficiencia de la aplicación:

- **Arquitectura Hexagonal**: Esta arquitectura separa los detalles del negocio (capa de dominio) de los detalles tecnicos (capa de infraestructura) comunicandolos a traves de un mediador (capa de aplicación). Facilitando el mantenimiento y las pruebas sobre la aplicación.

- **Arquitectura Orientada a Eventos**: Esta arquitectura nos permite manejar acciones de forma asincrona y operaciones en tiempo real, principalmente aprovechado, en nuestro caso, para el manejo de notificaciones mediante correo electronico y sincronización de las bases de datos relacional y no relacional.

- **Patron Command and Query Responsibility Segregation**: Este patron le permite a la aplicación hacer consultas con una mayor velocidad haciendo uso de una base de datos relacional para mantener la integridad de los datos al hacer escritura (commands) y una base de datos no relacional la cual posee una gran eficiencia a la hora de consultas (querys). Para la base de datos relacional se utilizo PostgresSQL y para la no relacional, MongoDB.

- **Programación Orientada a Aspectos (AOP)**: Se implemento este patrón de diseño utilizando decoradores, lo cual nos permite añadir funcionalidades adicionales a nuestras clases y métodos de una manera limpia y reutilizable.

- **Diseño Guiado por el Dominio (DDD)**: Este enfoque nos ayuda a modelar la lógica de negocio de nuestra aplicación de una manera que refleja el dominio del problema.

## Requisitos para su instalación
- Copiar las variables de entorno del .env.template
- Se debe poseer instalado en el equipo MongoDB y PostgresSQL, o utilizar imagenes de Docker.
- Tener una cuenta de MailJet

## Instalacion de dependencias

```bash
$ npm install
```

## Correr la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentación de endpoints
```bash
#local
localhost:<PORT>/documentation

#production
https://backend-alfa-hexa-production.up.railway.app/documentation
```

## Test

```bash
# unit tests
$ npm run test
```

# Documentacion de la Arquitectura
## Diagrama Modelo de Dominio
![Modelo de Dominio - Alpha - Página 1](https://github.com/user-attachments/assets/dc82d2ca-b335-4362-9eb0-bec8dc158bd6)

## Diagrama Arquitectura Hexagonal
![Modelo de Dominio - Alpha - Modelo de arquitectura](https://github.com/user-attachments/assets/14df3149-9e8d-4f93-acf7-9f264d366277)

