# build environment
FROM mhart/alpine-node as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN yarn
RUN yarn build

# production environment
FROM nginx:alpine
RUN mkdir -p /usr/src/app
COPY --from=builder /usr/src/app /usr/src/app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000