FROM node:16.8.0

ENV NODE_ENV production

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run start
