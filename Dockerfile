FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY ./dist .

CMD ["npm", "start"]