# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) files
COPY package.json ./
COPY yarn.lock ./

# Step 4: Install dependencies
RUN yarn install --frozen-lockfile

# Step 5: Bundle app source inside Docker image
COPY . .

# Step 6: Build the application
RUN yarn build

# Step 7: Application's port number
EXPOSE 9000

# Step 8: Define the Docker image's behavior at runtime
CMD ["node", "dist/src/main"]
