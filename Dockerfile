FROM node:20.17-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
