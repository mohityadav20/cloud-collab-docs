#!/bin/bash

# EC2 Deployment Script for Cloud Collab App
# Run this on your EC2 instance after initial setup

echo "🚀 Starting deployment..."

# Configuration
APP_DIR="/home/ubuntu/cc-2"
REPO_URL="https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"  # UPDATE THIS

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running on EC2
if [ ! -d "$APP_DIR" ]; then
    echo -e "${YELLOW}First time setup detected${NC}"
    echo "Cloning repository..."
    cd /home/ubuntu
    git clone $REPO_URL cc-2
    cd cc-2
else
    echo -e "${GREEN}Updating existing deployment${NC}"
    cd $APP_DIR
    git pull origin main
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Build the app
echo -e "${YELLOW}Building production app...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

# Restart Nginx
echo -e "${YELLOW}Restarting Nginx...${NC}"
sudo systemctl restart nginx

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx restarted successfully!${NC}"
else
    echo -e "${RED}❌ Nginx restart failed!${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "Your app should now be live at:"
echo "http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"

