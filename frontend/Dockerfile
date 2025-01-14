FROM node:23-alpine3.20

WORKDIR /workspace/frontend

RUN apk update && \
  apk add git

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]