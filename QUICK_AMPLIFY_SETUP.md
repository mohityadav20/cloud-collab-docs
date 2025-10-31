# Quick Amplify Setup Guide

## ✅ Step 1: Initialize Amplify Project

```bash
amplify init
```

**Answer the prompts like this:**

```
? Enter a name for the environment: dev
? Choose your default editor: Visual Studio Code (or your choice)
? Choose the type of app that you're building: javascript
? What javascript framework are you using: react
? Source Directory Path: src
? Distribution Directory Path: dist
? Build Command: npm run build
? Start Command: npm start
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: default (or your AWS profile)
```

This will take 1-2 minutes.

## ✅ Step 2: Add Authentication (Cognito)

```bash
amplify add auth
```

**Choose these options:**
- `Default configuration with Social Provider (Federation)`
- OR `Default configuration`
- Use the default: `Email` for sign-in
- When asked about password requirements: Use defaults (or customize)
- Enable MFA: `No` (for development)

## ✅ Step 3: Add GraphQL API (AppSync)

```bash
amplify add api
```

**Choose these options:**
- Type: `GraphQL`
- API name: `collabdocs` (or your choice)
- Authorization type: `Amazon Cognito User Pool`
- Configure conflict detection: `Yes, auto merge`
- Use a schema template: `No`
- Edit schema now: `Yes`

**Important:** When the schema editor opens:
1. Delete everything in the editor
2. Open `amplify/backend/api/collabdocs/schema.graphql` in your text editor
3. Copy ALL the contents
4. Paste into the Amplify schema editor
5. Save and exit

## ✅ Step 4: Add Storage (S3)

```bash
amplify add storage
```

**Choose these options:**
- Type: `Content (Images, audio, video, etc.)`
- Bucket name: `collab-docs-assets` (or your choice)
- Who should have access: `Auth users only`
- Restrict access by: `Auth users only`
- Select permissions: `create/update, read, delete`

## ✅ Step 5: Push Everything to AWS

```bash
amplify push
```

**This is the important step:**
- Review the changes (should show Auth, API, Storage)
- Type `Y` to confirm
- This takes **10-15 minutes** ⏰
- Wait for it to complete!

## ✅ Step 6: Get Your Configuration Values

After `amplify push` completes, you'll see an `amplify_outputs.json` file created.

**Get the values:**
```bash
# On Windows
type amplify_outputs.json

# On Mac/Linux
cat amplify_outputs.json
```

Or check the file in your editor.

## ✅ Step 7: Create .env File

Create a file named `.env` in the project root (`D:\cc 2\.env`) with:

```env
VITE_APP_USER_POOL_ID=<value from amplify_outputs.json - auth.userPoolId>
VITE_APP_USER_POOL_CLIENT_ID=<value from amplify_outputs.json - auth.userPoolClientId>
VITE_APP_REGION=us-east-1
VITE_APP_API_ENDPOINT=<value from amplify_outputs.json - data.aws_appsync_graphqlEndpoint>
VITE_APP_STORAGE_BUCKET=<value from amplify_outputs.json - storage.aws_user_files_s3_bucket>
```

**Example:**
```env
VITE_APP_USER_POOL_ID=us-east-1_ABC123XYZ
VITE_APP_USER_POOL_CLIENT_ID=1a2b3c4d5e6f7g8h9i0j
VITE_APP_REGION=us-east-1
VITE_APP_API_ENDPOINT=https://abc123xyz.appsync-api.us-east-1.amazonaws.com/graphql
VITE_APP_STORAGE_BUCKET=collab-docs-assets-dev-abc123xyz
```

## ✅ Step 8: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart
npm start
```

Now try to sign in - it should work! 🎉

## 🔍 Finding Values in amplify_outputs.json

The JSON structure looks like:
```json
{
  "auth": {
    "userPoolId": "us-east-1_...",
    "userPoolClientId": "..."
  },
  "data": {
    "aws_appsync_graphqlEndpoint": "https://..."
  },
  "storage": {
    "aws_user_files_s3_bucket": "..."
  }
}
```

## 🐛 Troubleshooting

**"amplify: command not found"**
```bash
npm install -g @aws-amplify/cli
```

**"No AWS credentials"**
```bash
amplify configure
# OR
aws configure
```

**"Permission denied"**
- Check your AWS IAM permissions
- Ensure you have permissions for: Cognito, AppSync, DynamoDB, S3, Lambda

**Still seeing "Auth UserPool not configured"**
- Make sure `.env` file exists in project root
- Check that all values are filled in
- Restart the dev server after creating `.env`
- Check browser console for specific errors

---

**Need help?** Check `AWS_SETUP.md` for more detailed instructions.

