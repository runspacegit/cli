FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn link
CMD ["runspace"]
