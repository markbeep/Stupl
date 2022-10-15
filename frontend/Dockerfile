FROM node:16-alpine as build-stage

WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . .

RUN npm run build


FROM nginx:1.22-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build/ /usr/share/nginx/html
EXPOSE 80

# ENTRYPOINT ["nginx", "-g", "daemon off;]
