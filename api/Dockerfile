FROM node:12-alpine
WORKDIR /app
COPY ./app/package.json /app/package.json
RUN npm i
COPY ./app /app
CMD [ "npx", "nodemon" ]