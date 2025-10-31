# Setup AWS Backend First (To Get Environment Variable Values)

Since you don't have the values yet, you need to set up the AWS Amplify backend first. This will create all the AWS services and generate the values you need.

## 🎯 Step-by-Step Guide

### Prerequisites Check

Make sure you have:
- ✅ AWS account set up
- ✅ AWS CLI configured (`aws configure`)
- ✅ Amplify CLI installed (`npm install -g @aws-amplify/cli`)

---

## 📋 Step 1: Initialize Amplify Project

```bash
amplify init
```

**Answer the prompts:**

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
? Please choose the profile you want to use: default (or your profile)
```

**This takes 1-2 minutes.**

---

## 🔐 Step 2: Add Authentication (Cognito)

```bash
amplify add auth
```

**Choose these options:**

```
? Do you want to use the default authentication and security configuration? 
  > Default configuration with Social Provider (Federation)

? How do you want users to be able to sign in? 
  > Email

? Do you want to configure advanced settings? 
  > No, I am done.
```

**This creates Cognito User Pool and generates:**
- `VITE_APP_USER_POOL_ID`
- `VITE_APP_USER_POOL_CLIENT_ID`

---

## 📡 Step 3: Add GraphQL API (AppSync)

```bash
amplify add api
```

**Choose these options:**

```
? Select from one of the below mentioned services: GraphQL
? Here is the GraphQL API that we will create. Select a setting to edit or continue: Continue
? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)
```

**Wait, you need to use our custom schema!**

### 3.1 Edit Schema File

After the command completes, you need to replace the schema:

1. Open: `amplify/backend/api/collabdocs/schema.graphql` (or similar path)
2. Delete everything in that file
3. Copy the contents from: `amplify/backend/api/collabdocs/schema.graphql` (the one we created)
4. Paste and save

**OR manually copy from our schema file:**

The schema should be in: `amplify/backend/api/collabdocs/schema.graphql`

If not, create it with our schema content (from the project).

### 3.2 Continue Setup

After editing the schema, you'll need to:

```bash
amplify push
```

**This will:**
- Create AppSync API
- Create DynamoDB tables
- Generate: `VITE_APP_API_ENDPOINT`

---

## 💾 Step 4: Add Storage (S3)

```bash
amplify add storage
```

**Choose these options:**

```
? Select from one of the below mentioned services: Content (Images, audio, video, etc.)
? Please provide a friendly name for your resource that will be used to label this category in the project: assets
? Please provide bucket name: collab-docs-assets
? Who should have access? Auth users only
? What kind of access do you want for Authenticated users? create/update, read, delete
? Do you want to add a Lambda Trigger for your S3 Bucket? No (for now)
```

**This creates S3 bucket and generates:**
- `VITE_APP_STORAGE_BUCKET`

---

## ⚡ Step 5: Push Everything to AWS

```bash
amplify push
```

**This is the big step:**

1. **Review the changes:**
   - Should show: Auth, API, Storage
   - Review what will be created

2. **Accept changes:**
   - Type `Y` when asked
   - This takes **10-15 minutes** ⏰

3. **Wait for completion:**
   - Watch for "✅ Successfully created/updated resources"

---

## 📝 Step 6: Get Your Values

After `amplify push` completes:

### Option A: Check amplify_outputs.json

```bash
# View the file
type amplify_outputs.json
# On Mac/Linux: cat amplify_outputs.json
```

**You'll see:**
```json
{
  "auth": {
    "userPoolId": "us-east-1_ABC123XYZ",        ← Copy this
    "userPoolClientId": "abc123def456..."       ← Copy this
  },
  "data": {
    "aws_appsync_graphqlEndpoint": "https://..." ← Copy this
  },
  "storage": {
    "aws_user_files_s3_bucket": "bucket-name..." ← Copy this
  }
}
```

### Option B: Use Amplify Status

```bash
amplify status
```

This shows all your resources and their IDs.

---

## ✅ Step 7: Add Values to Amplify Console

Now go back to AWS Amplify Console and add the environment variables:

1. Go to: https://console.aws.amazon.com/amplify/
2. Your app → **App settings** → **Environment variables**
3. Add each variable with the values you copied

---

## 🎯 Complete Setup Checklist

- [ ] `amplify init` completed
- [ ] `amplify add auth` completed
- [ ] `amplify add api` completed
- [ ] Schema file updated with our custom schema
- [ ] `amplify add storage` completed
- [ ] `amplify push` completed (10-15 min)
- [ ] `amplify_outputs.json` file exists
- [ ] Copied all 5 environment variable values
- [ ] Added variables to Amplify Console
- [ ] Redeployed app in Amplify Console

---

## 🚀 Quick Command Sequence

Run these commands in order:

```bash
# 1. Initialize
amplify init

# 2. Add services
amplify add auth          # Choose: Default, Email
amplify add api           # Choose: GraphQL, then edit schema file
amplify add storage       # Choose: Content, Auth users only

# 3. Push to AWS (10-15 minutes)
amplify push              # Type Y to confirm

# 4. Get values
type amplify_outputs.json
```

---

## ⚠️ Important Notes

1. **Cost:** These services are in AWS Free Tier, but monitor usage
2. **Time:** `amplify push` takes 10-15 minutes - be patient!
3. **Schema:** Make sure to use our custom GraphQL schema (not the default template)
4. **Region:** All resources will be created in your chosen region (e.g., `us-east-1`)

---

## 🐛 Troubleshooting

**"Amplify not configured"**
```bash
amplify configure
```

**"No AWS credentials"**
```bash
aws configure
```

**"Permission denied"**
- Check your AWS IAM permissions
- Ensure you have permissions for: Cognito, AppSync, DynamoDB, S3

**"Schema errors"**
- Make sure schema is valid GraphQL
- Check for syntax errors
- Run `amplify status` to see if API was created

---

**Ready? Start with:** `amplify init`

Need help with any step? Let me know!

