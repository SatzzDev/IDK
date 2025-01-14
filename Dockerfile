FROM node:18

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
  libappindicator3-1 \
  fonts-liberation \
  libasound2 \
  libx11-xcb1 \
  libxcomposite1 \
  libxrandr2 \
  xdg-utils \
  chromium-browser \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the executable path for Puppeteer to the Chromium binary
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy project files
WORKDIR /app
COPY . /app

# Install dependencies
RUN npm install

# Run the app
CMD ["npm", "run", "dev"]
