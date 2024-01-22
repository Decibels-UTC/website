FROM --platform=linux/amd64,node:18-alpine

LABEL authors="leo"

WORKDIR /website/

COPY public/ /website/public
COPY src/ /website/src
COPY package.json /website/

RUN npm install
CMD ["npm", "start"]
