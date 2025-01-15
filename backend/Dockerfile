FROM node:23-alpine3.20

WORKDIR /workspace/backend

RUN apk update && \
  apk add git

COPY . .

RUN npm install -g @nestjs/cli

RUN npm install

CMD [ "npm", "run", "start:dev" ]