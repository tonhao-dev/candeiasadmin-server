# 1. --- Base ---
# Use the official Node.js image as the base image
FROM bitnami/node:22 AS base

# Set the working directory
WORKDIR /usr/app

# Default environment (build + run time)
ARG NODE_ENV production
ENV NODE_ENV=$NODE_ENV
ENV PORT=8080

# Expose the port the app runs on
EXPOSE 8080

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --production=false

# App source
COPY . .


# 2. --- Build and release ---
FROM base
RUN yarn build

# Prune dev dependencies, modules ts files, yarn cache after build
RUN yarn install --production && \
  yarn autoclean --init && \
  echo *.ts >> .yarnclean && \
  yarn autoclean --force && \
  yarn cache clean
CMD ["yarn", "start"]
