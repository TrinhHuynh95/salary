FROM node:16.15-alpine3.14

WORKDIR /localsrc

COPY /src .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "prod" ]