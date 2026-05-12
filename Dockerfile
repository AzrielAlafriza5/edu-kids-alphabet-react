# Use Node.js 20 as the base image
FROM node:20-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a separate stage for the runtime to keep the image small
FROM node:20-slim

WORKDIR /app

# Copy the build output and necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Set environment variable for the port
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start the application using the start script
# This script uses 'vite preview' to serve the built files
CMD ["npm", "run", "start"]
