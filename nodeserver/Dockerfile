FROM node:14.18.3-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY index.js .

CMD ["node", "index.js"]
