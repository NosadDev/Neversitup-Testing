FROM node:18.14.0 as build

WORKDIR /usr/app

COPY ./ ./

RUN npm install
RUN npm run build
RUN rm -rf node_modules
RUN npm install --omit=dev

FROM node:18.14.0-alpine

WORKDIR /usr/app

COPY --from=build /usr/app/package.json /usr/app/package.json
COPY --from=build /usr/app/node_modules /usr/app/node_modules
COPY --from=build /usr/app/dist /usr/app/dist
COPY --from=build /usr/app/.env /usr/app/.env

CMD ["node","dist/main.js"]