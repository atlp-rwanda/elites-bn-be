FROM node:16-alpine

WORKDIR /src/app
ARG PORT
COPY ./package.json .
RUN yarn cache clean --force
RUN yarn install
COPY .env.sample .env
COPY . .

EXPOSE ${PORT}



# CMD npm start
CMD [ "yarn", "dev" ]