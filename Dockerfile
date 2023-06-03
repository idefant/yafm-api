FROM node:18.10.0-alpine3.16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run db:gen
RUN npm run db:push
RUN npm run build

CMD [ "npm", "start" ]