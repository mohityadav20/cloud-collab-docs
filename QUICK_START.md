# ⚡ Quick Start - Run Locally in 5 Minutes

## Prerequisites Check

```bash
node --version  # Need v18+
npm --version
amplify --version  # Install: npm install -g @aws-amplify/cli
```

## Step-by-Step

### 1. Install Dependencies (2 min)

```bash
npm install
```

### 2. Initialize Amplify (10-15 min, one-time)

```bash
amplify init
# Follow prompts (choose defaults for most)

amplify add auth
# Choose: Default configuration
# Username: Email

amplify add api
# Choose: GraphQL
# Name: collabdocs
# Auth: Amazon Cognito User Pool
# Copy schema from: amplify/backend/api/collabdocs/schema.graphql

amplify add storage
# Choose: Content
# Bucket name: collab-docs-assets
# Access: Auth users only

amplify push
# Review and confirm (takes 10-15 minutes)
```

### 3. Configure Environment (1 min)

Create `.env` file:
```env
VITE_APP_API_ENDPOINT=<from amplify_outputs.json>
VITE_APP_REGION=us-east-1
VITE_APP_USER_POOL_ID=<from amplify_outputs.json>
VITE_APP_USER_POOL_CLIENT_ID=<from amplify_outputs.json>
VITE_APP_STORAGE_BUCKET=<from amplify_outputs.json>
```

**Where to find values:** Check `amplify_outputs.json` in project root after `amplify push`.

### 4. Start Dev Server (10 seconds)

```bash
npm start
# OR
npm run dev
```

Open: `http://localhost:5173` 🎉

## 🐛 Troubleshooting

**"Amplify not found"**
```bash
npm install -g @aws-amplify/cli
amplify configure
```

**"Environment variables not working"**
- Restart dev server after changing `.env`
- Check variable names start with `VITE_`

**"Port in use"**
```bash
npm run dev -- --port 3000
```

For more help, see [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)

