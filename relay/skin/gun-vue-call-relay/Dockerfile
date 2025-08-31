FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY server.js .
COPY start.js .
COPY public/ public/

RUN npm install

EXPOSE 8765

CMD ["node", "start.js"]
