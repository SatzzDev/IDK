FROM node:21.7.3-slim

RUN apt-get update && apt-get install gnupg wget python3-pip -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

RUN pip3 install --no-cache-dir rembg onnxruntime click asyncer fastapi gradio uvicorn

WORKDIR /app
COPY . /app

RUN npm install

CMD ["npm", "run", "dev"]
