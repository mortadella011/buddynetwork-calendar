FROM node:18-alpine3.17

COPY package-lock.json /home/node/app/
COPY package.json /home/node/app/

WORKDIR /home/node/app/

RUN npm install

ADD src /home/node/app/src/


CMD /bin/sh -c "npm start"
