FROM node:18

# Install ImageMagick
RUN apt-get update && apt-get install -y imagemagick

# Copy your project files
WORKDIR /app
COPY . /app

# Install project dependencies
RUN npx puppeteer browsers install
RUN npm install

# Run the application
CMD ["npm", "run", "dev"]
