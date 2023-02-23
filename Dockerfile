#FROM nginx:1.17.1-alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY /dist/sa-angular /usr/share/nginx/html


### STAGE 1: Build ###
FROM node:latest as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY  --from=build  /usr/src/app/dist/sa-angular /usr/share/nginx/html

## docker build -t sa-angular .
## docker run -d -p 80:80 sa-angular
## http://localhost:80/studyaid
## docker ps
## docker stop id