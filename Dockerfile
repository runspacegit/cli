FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn pack -f runspace.tgz
RUN yarn global add runspace.tgz
CMD ["runspace"]
