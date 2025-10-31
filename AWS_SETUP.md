# AWS Setup Guide

This guide will help you connect your app to AWS services.

## Step 1: Check if Amplify is initialized

```bash
amplify status
```

If you see an error or "No Amplify backend project found", you need to initialize.

## Step 2: Initialize Amplify

```bash
amplify init
```

**Answer the prompts:**
- Environment name: `dev` (or your choice)
- Default editor: Your preference (VS Code recommended)
- Type of app: `javascript`
- Framework: `react`
- Source directory: `src`
- Distribution directory: `dist`
- Build command: `npm run build`
- Start command: `npm start`
- Use AWS profile? `Yes` (or configure if needed)

## Step 3: Add Authentication (Cognito)

```bash
amplify add auth
```

**Select these options:**
- Default configuration
- Username: `Email`
- Password requirements: Default (or adjust)
- Enable MFA: `No` (for development)

## Step 4: Add GraphQL API (AppSync)

```bash
amplify add api
```

**Select these options:**
- Type: `GraphQL`
- API name: `collabdocs` (or your choice)
- Authorization type: `Amazon Cognito User Pool`
- Use a schema template: `No`
- Edit schema now: `Yes`

**Copy the schema:**
1. Open `amplify/backend/api/collabdocs/schema.graphql`
2. Copy its entire contents
3. Paste into the editor that opened (or edit `amplify/backend/api/collabdocs/schema.graphql` directly)

**After saving, answer:**
- Do you want to edit the schema now: `No`

## Step 5: Add Storage (S3)

```bash
amplify add storage
```

**Select these options:**
- Type: `Content (Images, audio, video, etc.)`
- Bucket name: `collab-docs-assets` (or your choice)
- Who should have access: `Auth users only`
- Restrict access by: `Auth users`
- Select permissions: `create/update, read, delete`

## Step 6: Push to AWS

```bash
amplify push
```

**Important:**
- Review the changes (should show Auth, API, Storage)
- Accept changes: `Yes`
- This takes **10-15 minutes**

## Step 7: Get Configuration Values

After `amplify push` completes:

```bash
# Check status
amplify status

# Or view outputs
type amplify_outputs.json
# On Mac/Linux: cat amplify_outputs.json
```

## Step 8: Create .env File

Create a `.env` file in the project root with:

```env
VITE_APP_API_ENDPOINT=<value from amplify_outputs.json>
VITE_APP_REGION=us-east-1
VITE_APP_USER_POOL_ID=<value from amplify_outputs.json>
VITE_APP_USER_POOL_CLIENT_ID=<value from amplify_outputs.json>
VITE_APP_STORAGE_BUCKET=<value from amplify_outputs.json>
```

**Where to find values:**
- Check `amplify_outputs.json` after `amplify push`
- Or run: `amplify status` and look at the outputs

## Step 9: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm start
```

## Troubleshooting

**"Amplify CLI not configured"**
```bash
amplify configure
```

**"No AWS credentials"**
- Run `aws configure` to set up credentials
- Or use `amplify configure` to set up profile

**"Can't find amplify_outputs.json"**
- Make sure you ran `amplify push`
- Check if file exists: `ls amplify_outputs.json` or `dir amplify_outputs.json`

---

Once setup is complete, you can sign up and sign in through the app!

