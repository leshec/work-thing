# Use the official Bun image from Docker Hub
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and bun.lockb into the container
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of your app's source code into the container
COPY . .

# Expose the port your app will run on (assuming the default port is 3000)
EXPOSE 3000

# Start the app in development mode
CMD ["bun", "run", "dev"]
