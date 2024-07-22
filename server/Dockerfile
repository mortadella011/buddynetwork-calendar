FROM node:22-alpine

COPY package-lock.json /home/node/app/
COPY package.json /home/node/app/

WORKDIR /home/node/app/

RUN npm install

ADD src /home/node/app/src/


CMD /bin/sh -c "npm start"
