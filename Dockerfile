FROM node:16.16.0 as build

WORKDIR /app
COPY package*.json .
RUN npm install --save --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/road-runner-admin-webapp /usr/share/nginx/html
