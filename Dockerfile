FROM node:10 AS BUILD_IMAGE

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin


WORKDIR /app

COPY . /app

EXPOSE 8080

RUN npm install && npm run build

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

# remove unused dependencies
RUN rm -rf node_modules/ammap3
RUN rm -rf node_modules/amcharts

FROM node:10

WORKDIR /app


# copy from build image
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

RUN npm i -g http-server

CMD http-server ./dist