FROM node:16.8.0

ENV NODE_ENV production

WORKDIR '/app'

COPY ./package.json .

RUN npm install

COPY . .

COPY wait-for-it.sh .

RUN chmod +x ./wait-for-it.sh

EXPOSE 3000

CMD npm run seed && npm run start
