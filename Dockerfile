# base image
FROM node:15
# create directory
WORKDIR /app
# copy package.json to /app
COPY package.json .

ARG NODE_ENV
# install node_modules by running this command (build)
RUN if [ "$NODE_ENV" = "dev" ];\
        then npm install;\
        else npm install --only=production;\
        fi
# copy rest of src files
COPY . ./
# run app in port 3000
ENV PORT 3000
EXPOSE $PORT
# Run this commad to actually start the app (run)
CMD [ "node", "index.js" ]