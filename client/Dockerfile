# Dockerfile for React client
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy rest of the application
COPY . ./

# Build the React app
RUN npm run build

# Serve the React app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
