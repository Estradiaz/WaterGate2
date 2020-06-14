FROM node:12-alpine as builder
RUN npm i -g @vue/cli
WORKDIR /app
COPY ./app/package.json /app/package.json
RUN npm i
COPY ./app /app
CMD [ "npm", "run", "build" ]

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./app/default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]