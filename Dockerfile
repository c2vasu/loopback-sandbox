FROM node:6

MAINTAINER Srinivas Rao <rao.srinivasa.s@gmail.com>

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

CMD ["node", "."]
