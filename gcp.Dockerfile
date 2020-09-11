# Builder
FROM node:10.16.1-alpine as builder

ARG NPM_TOKEN

WORKDIR /app
COPY . /app

RUN apk update && apk upgrade && \
    apk --update add python make

RUN cp .npmrc.example .npmrc && echo -ne "\n//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> .npmrc
RUN npm install
RUN npm run build
RUN rm -f .npmrc

# Distribution
FROM node:10.16.1-alpine

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/docs /app/docs

EXPOSE 3000

CMD ["node", "dist/src/server.js"]
