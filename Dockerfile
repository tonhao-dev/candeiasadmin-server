# Use the official Node.js image as the base image
FROM bitnami/node:22 AS base

# Set the working directory
WORKDIR /usr/app

# Default environment (build + run time)
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Expose the port the app runs on
EXPOSE 8080

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production=false

# App source
COPY . .

FROM base
RUN yarn build

# Prune dev dependencies, modules ts files, yarn cache after build
RUN yarn install --production && \
  yarn autoclean --init && \
  echo *.ts >> .yarnclean && \
  yarn autoclean --force && \
  yarn cache clean
CMD ["node", "dist/index.js"]
