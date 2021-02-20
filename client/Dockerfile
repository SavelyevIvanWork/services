FROM node:14

WORKDIR /app
COPY package*.json /app/package.json

RUN npm install
COPY . /app
RUN npm run start

EXPOSE 8080

CMD ["node", "index.js"]