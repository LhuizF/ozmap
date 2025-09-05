FROM node:22-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn install --production --frozen-lockfile

EXPOSE 3333

CMD ["node", "dist/server.js"]
