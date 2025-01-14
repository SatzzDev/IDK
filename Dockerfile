FROM node:18

RUN apt-get update && apt-get install -y \
  libuuid1 \
  imagemagick \
  chromium-browser \
  --no-install-recommends && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

RUN npm install

CMD ["npm", "run", "dev"]
