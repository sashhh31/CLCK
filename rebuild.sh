#!/bin/bash

# Rebuild script for CLCK application
echo "Starting rebuild process..."

# Navigate to the CLCK directory
cd CLCK

# Install dependencies (if needed)
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Restart PM2 process
echo "Restarting PM2 process..."
pm2 restart clck-app

echo "Rebuild completed successfully!"
echo "Your application should now show the latest Contentful data."
