FROM node:10.16.3-alpine

WORKDIR /app

EXPOSE 3000

CMD npm run start:dev
