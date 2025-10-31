#!/bin/bash

# Setup script for Cloud Collaborative Document Management System
# Initializes AWS Amplify resources and configures the environment

set -e

echo "🚀 Setting up Cloud Collaborative Document Management System..."
echo ""

# Check if Amplify CLI is installed
if ! command -v amplify &> /dev/null; then
    echo "❌ Amplify CLI is not installed. Please install it first:"
    echo "   npm install -g @aws-amplify/cli"
    exit 1
fi

echo "✅ Amplify CLI is installed"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Initialize Amplify project (interactive)
echo ""
echo "📦 Initializing Amplify project..."
echo "⚠️  This will open an interactive prompt. Please follow the instructions:"
amplify init

# Add authentication
echo ""
echo "🔐 Adding authentication..."
amplify add auth

# Add API (GraphQL)
echo ""
echo "📡 Adding GraphQL API..."
amplify add api

# Add storage (S3)
echo ""
echo "💾 Adding storage (S3)..."
amplify add storage

# Add function (Lambda)
echo ""
echo "⚡ Adding Lambda function for image resizing..."
amplify add function

# Push resources to AWS
echo ""
echo "☁️  Pushing resources to AWS..."
amplify push

# Generate environment variables
echo ""
echo "📝 Generating environment variables..."
echo "⚠️  Please copy the values from amplify_outputs.json to .env"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Copy environment variables from amplify_outputs.json to .env"
echo "   2. Run: npm run dev"
echo ""
echo "💡 For detailed instructions, see README.md"

