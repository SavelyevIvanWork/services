FROM node:14

WORKDIR /app
COPY package*.json /app/package.json/
COPY . /app/
CMD  ["npm", "install"]


EXPOSE 8080

CMD [ "npm", "run", "dev" ]