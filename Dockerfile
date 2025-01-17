FROM node:18

# Install dependencies
RUN apt-get update && apt-get install -y imagemagick libnss3

# Copy your project files
WORKDIR /app
COPY . /app

# Install project dependencies
RUN npm install

# Run the application
CMD ["npm", "run", "dev"]
