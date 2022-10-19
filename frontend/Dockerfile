FROM node:16-alpine as build-stage

WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
