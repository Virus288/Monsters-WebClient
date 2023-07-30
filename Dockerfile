FROM node:18
ENV NODE_ENV prod
ARG REACT_APP_BACKEND

WORKDIR /usr/src/app
ADD package.json /usr/src/app
RUN npm install

ADD . /usr/src/app
ENV REACT_APP_BACKEND=$REACT_APP_BACKEND
RUN npm run build

FROM nginx:alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
