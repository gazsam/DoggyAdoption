FROM hwestphal/nodebox

COPY ./ /src
WORKDIR /src

RUN npm install

EXPOSE  8080
CMD ["node", "server.js"]
