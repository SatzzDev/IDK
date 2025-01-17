# Use the latest Node.js LTS (Long Term Support) version as the base image
FROM node:21.7.3-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gnupg \
    wget \
    python3 \
    python3-pip \
    python3-dev \
    libmagic1 \
    google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install rembg dependencies
RUN pip3 install --no-cache-dir \
    rembg \
    onnxruntime \
    click \
    asyncer \
    fastapi \
    gradio \
    uvicorn \
    python-multipart \
    watchdog \
    aiohttp \



# Copy your project files
WORKDIR /app
COPY . /app

# Install project dependencies
RUN npm install

# Expose port if necessary (optional)
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
