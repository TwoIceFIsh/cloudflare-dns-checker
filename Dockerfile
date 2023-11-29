# Builder Stage
FROM node:18 AS builder

WORKDIR /app

COPY . .
COPY .env.docker /app/.env

RUN npm install

RUN npx prisma db push

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm","run", "start"]
