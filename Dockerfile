# Step 1: Use Node.js as the base image for building
FROM node:18-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Install sharp (for Next.js image optimization)
RUN npm install sharp

# Step 6: Copy the rest of the application
COPY . .

# Step 7: Set environment variables
ENV NEXT_PRIVATE_SKIP_ESLINT=true

# Step 8: Build the application
RUN npm run build

# Step 9: Use Node.js to serve the production build
FROM node:18-alpine AS production

# Step 10: Set working directory
WORKDIR /app

# Step 11: Copy built application from the builder stage
COPY --from=builder /app ./

# Step 12: Install production-only dependencies
RUN npm install --omit=dev

# Step 13: Expose application port
EXPOSE 3000

# Step 14: Start the application
CMD ["npm", "run", "start"]
