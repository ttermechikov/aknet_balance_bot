FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Manage the `NODE_ENV` variable
# set it to the 'production' if nothing is provided
ARG NODE_ENV='production'
ENV NODE_ENV=${NODE_ENV}

ENV BOT_TOKEN=${BOT_TOKEN}

# Installing dependencies depending on how the variable `NODE_ENV` is set.
RUN if [ "$NODE_ENV" == "production" ] ; then \
        npm ci --only=production ; \
    else \
        npm install --no-package-lock ; \
    fi

# Bundle app source
COPY ./dist/ .

EXPOSE 3000

# Running a npm script depending on how the variable `NODE_ENV` is set.
CMD if [ "$NODE_ENV" == "production" ] ; then \
        node app.js ; \
    fi
