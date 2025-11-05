#!/bin/bash

# Local deployment helper script
# Run this on your LOCAL machine to deploy to EC2

# Configuration - UPDATE THESE VALUES
EC2_IP="YOUR_EC2_PUBLIC_IP"           # e.g., 54.123.45.67
KEY_FILE="cloud-collab-key.pem"        # Path to your .pem file
EC2_USER="ubuntu"
REMOTE_DIR="/home/ubuntu/cc-2"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Deploying to EC2...${NC}"
echo ""

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    echo -e "${RED}❌ Key file not found: $KEY_FILE${NC}"
    echo "Please update KEY_FILE in this script"
    exit 1
fi

# Check if EC2_IP is set
if [ "$EC2_IP" == "YOUR_EC2_PUBLIC_IP" ]; then
    echo -e "${RED}❌ Please update EC2_IP in this script${NC}"
    exit 1
fi

# Set correct permissions for key file
chmod 400 "$KEY_FILE"

# Test connection
echo -e "${YELLOW}Testing connection to EC2...${NC}"
ssh -i "$KEY_FILE" -o ConnectTimeout=5 -o StrictHostKeyChecking=no "$EC2_USER@$EC2_IP" "echo 'Connection successful'" 2>&1 | grep -q "Connection successful"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Cannot connect to EC2 instance${NC}"
    echo "Please check:"
    echo "  1. EC2 instance is running"
    echo "  2. Security group allows SSH from your IP"
    echo "  3. EC2_IP is correct"
    exit 1
fi

echo -e "${GREEN}✅ Connected to EC2${NC}"

# Deploy
echo -e "${YELLOW}Deploying application...${NC}"
ssh -i "$KEY_FILE" "$EC2_USER@$EC2_IP" << 'ENDSSH'
cd /home/ubuntu/cc-2
echo "📥 Pulling latest changes..."
git pull origin main
echo "📦 Installing dependencies..."
npm install
echo "🔨 Building app..."
npm run build
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx
echo "✅ Deployment complete!"
ENDSSH

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 Successfully deployed to EC2!${NC}"
    echo ""
    echo "Access your app at: http://$EC2_IP"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

