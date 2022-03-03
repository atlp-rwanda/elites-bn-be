FROM node:16

WORKDIR /elites-bn-be

COPY ./package.json .
RUN yarn cache clean --force
RUN yarn install
COPY . .

EXPOSE 5050



# CMD npm start
CMD [ "yarn", "dev" ]