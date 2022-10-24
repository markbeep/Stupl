FROM node:16-alpine as build-stage

WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY src/ src/
COPY public/ public/
COPY tsconfig.json .
COPY tailwind.config.js .

RUN npm run build

COPY entrypoint.sh .
COPY nginx.conf .

FROM nginx:stable-alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY --from=build-stage /app/entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
