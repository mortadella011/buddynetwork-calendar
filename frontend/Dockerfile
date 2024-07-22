FROM node:22-alpine

# install ng angular cli
RUN npm install -g @angular/cli@18

WORKDIR /home/node/app/

# copy angular node files
COPY angular.json package.json package-lock.json tsconfig.json tsconfig.spec.json tsconfig.app.json /home/node/app/
RUN npm ci
# copy sources
COPY src /home/node/app/src/

# build prod
RUN ng build


FROM nginx:1.27.0-alpine

COPY docker_nginx.conf /etc/nginx/conf.d/default.conf
COPY  --from=0 /home/node/app/dist/frontend/browser/ /usr/share/nginx/html/
