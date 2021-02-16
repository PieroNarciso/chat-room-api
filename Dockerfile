FROM node:14 AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./ ./
RUN npm install
RUN npm run build

FROM node:14 AS prod
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm install
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 8080
CMD npm run start
