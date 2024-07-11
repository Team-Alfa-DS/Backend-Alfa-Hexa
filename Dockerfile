FROM node:19-alpine3.15 AS dev

WORKDIR /app
COPY package.json ./
RUN npm install
CMD [ "npm", "run", "start:dev" ]

FROM node:19-alpine3.15 AS dev-deps

WORKDIR /app
COPY package.json package.json
RUN npm install --frozen-lockfile


FROM node:19-alpine3.15 AS builder

WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm build


FROM node:19-alpine3.15 AS prod-deps

WORKDIR /app
COPY package.json package.json
RUN npm install --prod --frozen-lockfile


FROM node:19-alpine3.15 AS prod

EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

COPY . .

CMD [ "node","dist/main" ]