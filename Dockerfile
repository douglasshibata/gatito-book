FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install -g npm
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/gatito-book /usr/share/nginx/html
