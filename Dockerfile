FROM node:18

# Install ImageMagick
RUN apt-get install -y libuuid imagemagick chromium 

# Copy your project files
WORKDIR /app
COPY . /app

# Install project dependencies
RUN npm install

# Run the application
CMD ["npm", "run", "dev"]