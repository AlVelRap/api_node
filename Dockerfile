FROM node:19

WORKDIR /home/backend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]