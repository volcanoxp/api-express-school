FROM node:17-alpine3.14

RUN mkdir /app && chown -R node:node /app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

USER node

EXPOSE 3001

CMD ["npm", "run", "start"]