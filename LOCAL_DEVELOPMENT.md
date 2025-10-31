# Local Development Guide

This guide walks you through running the Cloud Collaborative Document Management System locally.

## 📋 Prerequisites

Before you begin, ensure you have:

1. **Node.js 18+** installed
   ```bash
   node --version  # Should be v18 or higher
   ```

2. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

3. **AWS Account** with credentials configured
   - You'll need AWS CLI configured OR Amplify CLI will prompt for credentials
   - See: [AWS CLI Setup](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

4. **AWS Amplify CLI** installed globally
   ```bash
   npm install -g @aws-amplify/cli
   amplify --version  # Verify installation
   ```

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd cloud-collab-docs

# Install npm packages
npm install
```

This installs all React, Amplify, and other dependencies (~5 minutes on first run).

### Step 2: Initialize AWS Amplify (One-Time Setup)

**Important**: You only need to do this once per project. If you've already initialized Amplify, skip to Step 3.

#### Option A: Automatic Setup (Recommended)

```bash
# Run the setup script (Linux/Mac)
chmod +x setup.sh
./setup.sh

# OR on Windows (PowerShell)
node scripts/setup.js
```

#### Option B: Manual Setup (More Control)

```bash
# 1. Initialize Amplify project
amplify init

# Answer the prompts:
#   - Enter a name for the environment: dev
#   - Choose your default editor: (your preference)
#   - Choose the type of app: javascript
#   - What javascript framework: react
#   - Source directory path: src
#   - Distribution directory path: dist
#   - Build command: npm run build
#   - Start command: npm run dev
#   - Do you want to use an AWS profile? Yes
#   - Please choose the profile you want to use: (your AWS profile)

# 2. Add Authentication
amplify add auth
# Select: Default configuration with Social Provider (Federation)
# OR: Manual configuration
#   - Username attributes: Email
#   - Sign in options: Email
#   - Multi-factor auth: No MFA

# 3. Add GraphQL API
amplify add api
# Select: GraphQL
# API name: collabdocs (or your preference)
# Authorization type: Amazon Cognito User Pool
# Use a schema template: No
# Edit schema now: Yes

# Copy the schema from amplify/backend/api/collabdocs/schema.graphql
# Paste it into the editor, then save and exit

# 4. Add Storage (S3)
amplify add storage
# Select: Content (Images, audio, video, etc.)
# Bucket name: collab-docs-assets
# Who should have access: Auth users only
# Restrict access by: Auth/Guest users
# Select permissions: create/update, read, delete

# 5. Add Lambda Function (for image resizing)
amplify add function
# Function name: imageResize
# Runtime: Node.js
# Function template: Hello World
# Do you want to configure advanced settings? Yes
#   - Environment variables: Add THUMBNAIL_BUCKET and THUMBNAIL_PREFIX

# Then copy the function code:
# Replace amplify/backend/function/imageResize/src/index.js with provided code
# Update amplify/backend/function/imageResize/src/package.json to include Sharp

# 6. Push resources to AWS
amplify push
# Review the changes (should show Auth, API, Storage, Function)
# Accept? Yes
# This takes 10-15 minutes
```

### Step 3: Configure Environment Variables

After `amplify push`, Amplify generates `amplify_outputs.json`. Copy values to `.env`:

```bash
# Create .env file from example
cp .env.example .env

# Open .env and add values from amplify_outputs.json
# The file should be in the project root
```

Example `.env` file:

```env
VITE_APP_API_ENDPOINT=https://xxxxxxxxxxxx.appsync-api.us-east-1.amazonaws.com/graphql
VITE_APP_REGION=us-east-1
VITE_APP_USER_POOL_ID=us-east-1_xxxxxxxxx
VITE_APP_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_APP_STORAGE_BUCKET=collab-docs-assets-dev-xxxxxxxxxx
VITE_ENABLE_EXPORT_TO_S3=false
```

**To find these values:**
- Check `amplify_outputs.json` in the project root (auto-generated after `amplify push`)
- Or run: `amplify status` and `amplify console api` / `amplify console auth`

### Step 4: Start Development Server

```bash
npm run dev
```

The dev server will start on `http://localhost:5173` (or next available port).

Open your browser to see the application!

## 🎯 Development Workflow

### Running the App

```bash
# Start dev server (hot reload enabled)
npm start
# OR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test -- --watch
```

### Amplify Commands

```bash
# Check Amplify status
amplify status

# Pull latest backend changes (if working in team)
amplify pull

# Push local changes to AWS
amplify push

# Open AWS Console for resources
amplify console api      # Opens AppSync console
amplify console auth     # Opens Cognito console
amplify console storage  # Opens S3 console
amplify console function # Opens Lambda console
```

### Using Make (Optional)

If you have `make` installed:

```bash
# Show all available commands
make help

# Install dependencies
make install

# Start dev server
make dev

# Run tests
make test
```

## 🔧 Troubleshooting

### Issue: "Amplify CLI not found"

**Solution:**
```bash
npm install -g @aws-amplify/cli
amplify configure  # Set up AWS credentials
```

### Issue: "Environment variables not loading"

**Solution:**
1. Ensure `.env` file exists in project root
2. Check variable names start with `VITE_` (required for Vite)
3. Restart dev server after changing `.env`
4. Verify no typos in variable names

### Issue: "Authentication not working"

**Solution:**
1. Check `.env` has correct `VITE_APP_USER_POOL_ID` and `VITE_APP_USER_POOL_CLIENT_ID`
2. Verify Cognito User Pool exists: `amplify console auth`
3. Ensure Amplify is configured: Check `src/amplify/configure.ts`
4. Check browser console for errors

### Issue: "GraphQL API errors"

**Solution:**
1. Verify API endpoint in `.env`: `VITE_APP_API_ENDPOINT`
2. Check AppSync console: `amplify console api`
3. Verify schema is deployed: `amplify status`
4. Ensure you're signed in (GraphQL uses Cognito auth)

### Issue: "S3 upload fails"

**Solution:**
1. Check S3 bucket name in `.env`: `VITE_APP_STORAGE_BUCKET`
2. Verify bucket exists: `amplify console storage`
3. Check IAM permissions (should be auto-configured by Amplify)
4. Ensure CORS is configured (check S3 bucket settings)

### Issue: "TypeScript errors"

**Solution:**
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript version
npx tsc --version
```

### Issue: "Port already in use"

**Solution:**
```bash
# Kill process on port 5173
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

## 📝 Common Development Tasks

### Creating a Test User

1. Sign up through the app UI (recommended)
   - Go to `/auth`
   - Click "Create account"
   - Enter email and password

2. Or via Cognito Console:
   ```bash
   amplify console auth
   # Navigate to Users tab → Create user
   ```

### Viewing Logs

```bash
# Lambda function logs
amplify function console imageResize

# AppSync logs (via CloudWatch)
amplify console api
# Then click "Queries" or check CloudWatch

# Cognito logs
# Check CloudWatch Logs in AWS Console
```

### Updating GraphQL Schema

1. Edit `amplify/backend/api/collabdocs/schema.graphql`
2. Run `amplify push`
3. Wait for deployment (~5-10 minutes)

### Testing Real-time Subscriptions

1. Open the app in two browser windows
2. Sign in with different accounts (or same account)
3. Open the same document in both windows
4. Edit in one window - changes should appear in the other!

## 🎨 Development Tips

1. **Hot Module Replacement (HMR)**: Vite provides instant updates on code changes
2. **Browser DevTools**: Use React DevTools and Network tab to debug
3. **GraphQL Explorer**: Use AppSync Console's query editor to test queries
4. **CloudWatch**: Monitor Lambda invocations and errors
5. **Amplify Studio**: Use `amplify studio` for visual schema editing

## 🚨 Important Notes

1. **AWS Costs**: Running locally still uses AWS resources (Cognito, AppSync, DynamoDB, S3, Lambda). Stay within Free Tier limits.

2. **Environment Variables**: Never commit `.env` to git (already in `.gitignore`)

3. **Local vs Production**: Some features (like image resizing) require actual AWS resources - can't fully mock locally

4. **Port Conflicts**: Vite uses port 5173 by default, but will auto-select next available port

5. **Cache Issues**: If seeing stale data:
   ```bash
   # Clear browser cache
   # Or use incognito/private mode
   # Or restart dev server
   ```

## 📚 Next Steps

- Read `README.md` for complete project documentation
- Check `PROJECT_SUMMARY.md` for assumptions and limitations
- Review AWS Amplify docs: https://docs.amplify.aws/

## 🆘 Getting Help

- Check browser console for errors
- Check terminal for build/compilation errors
- Run `amplify status` to verify backend state
- Review CloudWatch logs in AWS Console
- Check GitHub Issues (if using public repo)

---

Happy coding! 🚀

