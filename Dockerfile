FROM node:18.10.0-alpine3.16 AS builder

RUN apk update && apk add curl bash \
  && rm -rf /var/cache/apk/* \
  && curl -sf https://gobinaries.com/tj/node-prune | sh

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run db:gen \
  && npm run db:push \
  && npm run build \
  && npm prune --production \
  && /usr/local/bin/node-prune

FROM node:18.10.0-alpine3.16
USER node:node
WORKDIR /usr/src/app

COPY --from=builder --chown=node:node /usr/src/app/dist ./dist
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules

CMD [ "npm", "start" ]