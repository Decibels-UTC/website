FROM node:18-alpine

LABEL authors="leo"

WORKDIR /website/

COPY public/ /website/public
COPY src/ /website/src
COPY package.json /website/

RUN npm install

EXPOSE 3000
  
CMD ["npm", "start"]
