FROM node:18-slim

# Install dependencies for Chromium and Puppeteer
RUN apt-get update && apt-get install -y \
  wget \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install Puppeteer and its dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy your project files
COPY . /app

# Set the environment variable to make Puppeteer use the bundled Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Run the application
CMD ["npm", "run", "dev"]
