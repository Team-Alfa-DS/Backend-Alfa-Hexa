## .env

Crear el archivo ".env" usando las variables de ".env.template" y llenar las variables.

- PORT - 3000 por defecto
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- PG_EMAIL
- PG_PASSWORD
- JWT
- CLOUDINARY_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- OAUTH_CLIENT_ID
- OAUTH_CLIENT_SECRET
- OAUTH_REFRESH_TOKEN
- EMAIL_USERNAME
- EMAIL_PASSWORD
- MAILJET_API_KEY
- MAILJET_API_SECRET
- FIREBASE_PROJECT_ID
- FIREBASE_PRIVATE_KEY
- FIREBASE_CLIENT_EMAIL

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation
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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
