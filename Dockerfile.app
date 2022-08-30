FROM --platform=linux/x86_64 node:18-alpine3.16

WORKDIR /app

RUN apk add --update --no-cache yarn

USER node