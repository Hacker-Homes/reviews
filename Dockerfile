FROM node:12.16.1-alpine
ENV NODE_ENV production

RUN mkdir -p /src/

WORKDIR /src/

COPY . /src/

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]